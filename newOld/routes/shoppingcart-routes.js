const router = require("express").Router();
const CART = require("../models/shoppingcart-model");
const USERORDERS = require("../models/userOrders-model");
const crypto = require("crypto");
const Razorpay = require("razorpay");

// Verify Token
const verify = require("../verifyToken");

// Payment Configration

router.get("/order/:amount", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: "rzp_test_xk1pmd7sXsGx3L",
      key_secret: "kDgBuTpx3SIMQ5WEbd5RvNju",
    });

    // Generate order id
    let receiptId = Math.random().toString(36).substring(12);

    var options = {
      amount: parseInt(req.params.amount) * 100,
      currency: "INR",
      receipt: "order_" + receiptId,
    };
    const order = await instance.orders.create(options);
    if (!order)
      return res.send({ error: { description: "Some error occured" } });
    res.send(order);
  } catch (error) {
    res.send(error);
  }
});

// On Order Success
router.post("/order/success", async (req, res) => {
  try {
    // getting the details back from our font-end

    const { orderData, products, id } = req.body;

    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = orderData;

    // Creating our own digest
    // The format should be like this:
    // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
    const shasum = crypto.createHmac("sha256", "kDgBuTpx3SIMQ5WEbd5RvNju");

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    // comaparing our digest with the actual signature
    if (digest !== razorpaySignature)
      return res.send({ error: "Transaction not legit!" });

    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

    // Adding cart data to User Order
    await products.forEach((product) => delete product._id);
    await USERORDERS.insertMany(products);

    // Removing data from cart
    await CART.deleteMany({ cartId: id });

    res.send({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    res.send({ error: "failed" });
  }
});

// Get All Product
// router.get("/", async (req, res) => {
//   const alluser = await CART.find();
//   res.send({ alluser });
// });

// Add New Product on Cart
router.post("/add/:id", async (req, res) => {
  const products = await CART.find({ cartId: req.params.id });
  var check = true;
  if (products.length !== 0) {
    products.map(async (prod) => {
      if (prod.productName === req.body.productName) {
        check = false;
        const foundProduct = await CART.findById(prod._id);
        if (foundProduct) {
          foundProduct.totalItem = foundProduct.totalItem + req.body.totalItem;
          await new CART(foundProduct).save();
        }
      }
    });
  }
  if (check) {
    await new CART(req.body).save();
  }
  res.send("Product added");
});

// Get Product by ID
router.get("/:id", async (req, res) => {
  const allProduct = await CART.find({ cartId: req.params.id });
  res.send(allProduct);
});

// Update Product
router.put("/:id", verify, async (req, res) => {
  const foundUser = await CART.findById(req.params.id);
  const user = await CART.updateOne(
    { _id: req.params.id },
    {
      $set: {
        username: req.body.username ? req.body.username : foundUser.username,
        email: req.body.email ? req.body.email : foundUser.email,
        role: req.body.role ? req.body.role : foundUser.role,
        status: req.body.status ? req.body.status : foundUser.status,
      },
    }
  );
  res.send({ user });
});

// Delete User
router.delete("/:id", async (req, res) => {
  const user = await CART.deleteOne({ _id: req.params.id });
  if (!user) return res.send("invalid Id");
  res.send("Product Removed");
});

module.exports = router;
