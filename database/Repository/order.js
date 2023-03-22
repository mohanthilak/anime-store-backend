const orderModel = require("../Models/orders");
const ErrorMessage = "Error at Order Repository Layer";

class OrderRepository {
  async CreateOrder({
    custId,
    cartId,
    transactionDate,
    paymentType,
    paymentId,
    addressId,
  }) {
    try {
      const order = new orderModel({
        custId,
        cartId,
        transactionDate,
        paymentType,
        paymentId,
        addressId,
      });
      await order.save();
      return { success: true, data: order };
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async GetAllOrders() {
    try {
      const orders = await orderModel.find({});
      return { success: false, data: orders };
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }
}

module.exports = { OrderRepository };
