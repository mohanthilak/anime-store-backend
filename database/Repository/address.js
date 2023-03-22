const addressModel = require("../Models/address");
const ErrorMessage = "Error at Address Repository Layer";

class AddressRepository {
  async AddUserAddress({ uid, address, city, state, phoneNumbers }) {
    try {
      const addressObj = new addressModel({
        uid,
        address,
        city,
        state,
        phoneNumbers,
      });
      await addressObj.save();
      return { success: true, data: addressObj };
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async GetUserAddress({ uid }) {
    try {
      const address = await addressModel.find({ uid });
      return { success: true, data: address };
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }
}

module.exports = { AddressRepository };
