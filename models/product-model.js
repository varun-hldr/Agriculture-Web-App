const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
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
});

module.exports = mongoose.model("product", productSchema);
