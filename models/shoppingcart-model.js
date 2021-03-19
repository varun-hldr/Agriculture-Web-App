const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoppingCartSchema = new Schema({
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

module.exports = mongoose.model("shoppingCart", shoppingCartSchema);
