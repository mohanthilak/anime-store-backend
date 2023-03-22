const { Schema, model } = require("mognoose");

const addressModel = new Schema({
  uid: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  phoneNumbers: {
    type: [Number],
    required: true,
  },
});

module.exports = model("address", addressModel);
