const router = require("express").Router();
const Users = require("../models/user-model");
const USERORDERS = require("../models/userOrders-model");

// Verify Token
const verify = require("../verifyToken");

// Get All User
router.get("/", verify, async (req, res) => {
  const alluser = await Users.find();
  res.send({ alluser });
});

// Get User by ID
router.get("/:id", async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (!user) return res.send("User Not Found");
  res.send(user);
});

// Find all users by Id
router.get("/orders/:id", async (req, res) => {
  const orders = await USERORDERS.find({ cartId: req.params.id });
  res.send(orders);
});

// Update User
router.put("/:id", verify, async (req, res) => {
  const foundUser = await Users.findById(req.params.id);
  const user = await Users.updateOne(
    { _id: req.params.id },
    {
      $set: {
        username: req.body.username ? req.body.username : foundUser.username,
        email: req.body.email ? req.body.email : foundUser.email,
        role: req.body.role ? req.body.role : foundUser.role,
        status: req.body.status ? req.body.status : foundUser.status,
        password: req.body.password ? req.body.password : foundUser.password,
      },
    }
  );
  res.send({ user });
});

// Delete User
router.delete("/:id", verify, async (req, res) => {
  const user = await Users.deleteOne({ _id: req.params.id });
  if (!user) return res.send("invalid Id");
  res.send({ user });
});

module.exports = router;
