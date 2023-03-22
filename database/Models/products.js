const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sizes: [String],
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  orders: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  display: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
  },
  material: {
    type: String,
  },
  category: [{ type: String }],
});

module.exports = model("product", ProductSchema);
