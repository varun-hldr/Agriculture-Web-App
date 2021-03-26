const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userOrdersSchema = new Schema({
  productImage: Array,
  productName: String,
  productPrice: String,
  productRating: String,
  productDescription: String,
  productCategory: String,
  productInStock: Boolean,
  totalItem: Number,
  dateOfListing: Object,
  userId: String,
  userName: String,
  cartId: String,
});

module.exports = mongoose.model("userOrders", userOrdersSchema);
