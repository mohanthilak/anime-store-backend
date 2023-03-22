const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
  custId: {
    type: String,
    required: true,
  },
  cartId: {
    type: String,
    required: true,
  },
  transactionDate: {
    type: Date,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ["cod", "card", "UPI"],
    required: true,
  },
  paymentId: {
    type: String,
  },
  addressId: {
    type: String,
    required: true,
  },
  fulfilled: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("order", OrderSchema);
