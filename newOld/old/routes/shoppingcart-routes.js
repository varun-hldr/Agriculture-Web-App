const router = require("express").Router();
const CART = require("../models/shoppingcart-model");

// Verify Token
const verify = require("../verifyToken");

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
