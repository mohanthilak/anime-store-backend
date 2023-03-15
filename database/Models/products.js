const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  size: [String],
  price: {
    type: Number,
    required: true,
  },
  orders: {
    type: Number,
    default: 0,
  },
});

module.exports = model("product", ProductSchema);
