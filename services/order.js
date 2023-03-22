const ErrorMessage = "Error at Order Service Layer";

class OrderService {
  orderRepo;
  constructor(repo) {
    this.orderRepo = repo;
  }

  async CreateOrder({
    custId,
    cartId,
    transactionDate,
    paymentType,
    paymentId,
    addressId,
  }) {
    try {
      const data = await this.orderRepo.CreateOrder({
        custId,
        cartId,
        transactionDate,
        paymentType,
        paymentId,
        addressId,
      });
      return data;
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async GetAllOrders() {
    try {
      const data = await this.orderRepo.GetAllOrders();
      return data;
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }
}

module.exports = { OrderService };
