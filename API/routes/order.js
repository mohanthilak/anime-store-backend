const express = require("express");
const router = express.Router();

const { OrderService } = require("../../services/order");
const { OrderRepository } = require("../../database/Repository/order");

const { CartRepository } = require("../../database/Repository/cart");
const cartRepo = new CartRepository();
const { CartService } = require("../../services/cart");
const cartService = new CartService(cartRepo);

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);

router.post("/create", async (req, res) => {
  try {
    const {
      custId,
      paymentType,
      paymentId = "1122",
      addressId = "1232asd",
    } = req.body;
    const cart = await cartService.GetUsersCurrentCart(custId);
    const cartId = cart.data._id.toString();
    console.log(cartId);
    const data = await orderService.CreateOrder({
      custId,
      cartId,
      transactionDate: new Date(),
      paymentType,
      paymentId,
      addressId,
    });
    if (data.success) {
      await cartService.ChangeCurrentCartToFalse(custId);
      return res.status(200).json(data);
    }
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while handling creating order", e);
    return { success: false, error: e };
  }
});

router.get("/all-orders", async (req, res) => {
  try {
    const data = await orderService.GetAllOrders();
    if (data.success) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while handling creating order", e);
    return { success: false, error: e };
  }
});

module.exports = router;
