const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: String,
    required: true,
  },
});

const CartSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  products: {
    type: [productSchema],
  },
  amount: {
    type: Number,
    default: 0,
  },
  current: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("cart", CartSchema);
