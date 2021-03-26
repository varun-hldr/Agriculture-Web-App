const router = require("express").Router();
const Product = require("../models/product-model");

// Verify Token
const verify = require("../verifyToken");

// Get All Product
router.get("/allProducts", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// Add New Product
router.post("/add", async (req, res) => {
  const product = await new Product(req.body).save();
  res.send(product);
});

// Get Product by ID
router.get("/by/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.send(product);
});

router.get("/cat/:category", async (req, res) => {
  const products = await Product.find({ productCategory: req.params.category });
  res.send(products);
});

router.get("/find/:name", async (req, res) => {
  let products = [];
  const AllProduct = await Product.find();
  AllProduct.forEach((product) => {
    if (
      product.productName.toLowerCase().includes(req.params.name.toLowerCase())
    ) {
      products.push(product);
    }
  });

  res.send(products);
});

// Update Product
router.put("/:id", verify, async (req, res) => {
  const foundUser = await Product.findById(req.params.id);
  const user = await Product.updateOne(
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
router.delete("/delete/:id", async (req, res) => {
  const user = await Product.deleteOne({ _id: req.params.id });
  if (!user) return res.send("invalid Id");
  res.send(user);
});

module.exports = router;
