const router = require("express").Router();
const Product = require("../models/product-model");

// Verify Token
const verify = require("../verifyToken");

// Get All Product
router.get("/", async (req, res) => {
  const alluser = await Product.find();
  res.send({ alluser });
});

// Add New Product
router.post("/add", async (req, res) => {
  const product = await new Product(req.body).save();
  console.log(product);
  res.send("Hello");
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
router.delete("/:id", verify, async (req, res) => {
  const user = await Product.deleteOne({ _id: req.params.id });
  if (!user) return res.send("invalid Id");
  res.send({ user });
});

module.exports = router;
