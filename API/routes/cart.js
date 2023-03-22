const express = require("express");
const router = express.Router();

const { CartRepository } = require("../../database/Repository/cart");
const cartRepo = new CartRepository();
const { CartService } = require("../../services/cart");
const cartService = new CartService(cartRepo);

router.post("/create", async (req, res) => {
  try {
    const { products, uid, amount } = req.body;
    console.log(req.body);
    const data = await cartService.CreateCart({ products, uid, amount });
    console.log("From Create Cart", data);
    if (data.success) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while handling Create Cart", e);
    return res.status(401).json({ success: false, error: e });
  }
});

router.post("/add-product", async (req, res) => {
  try {
    const { id, productId, quantity, price, size, name, image, totalAmount } =
      req.body;
    console.log("req.body: ", req.body);
    const data = await cartService.addProductToCart({
      id,
      productId,
      quantity,
      price,
      image,
      name,
      size,
      totalAmount,
    });
    console.log("From add product to Cart", data);

    if (data.success) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while handling Add Product", e);
    return res.status(401).json({ success: false, error: e });
  }
});

router.post("/remove-product", async (req, res) => {
  try {
    const { cartId, productId } = req.body;
    const data = await cartService.removeProductFromCart(cartId, productId);
    if (data.success) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while removing product from cart", e);
    return res.status(401).json({ success: false, error: e });
  }
});

router.get("/current-cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await cartService.GetUsersCurrentCart(id);
    console.log("From Get curretn cart", data);
    if (data.success) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while getting current cart", e);
    return res.status(401), json({ success: false, error: e });
  }
});

router.post("/edit-product", async (req, res) => {
  try {
    const { uid, productElementId, quantity } = req.body;
    console.log(req.body);
    const data = await cartService.EditProductInCart({
      uid,
      productElementId,
      quantity,
    });
    if (data.success) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while editing product in cart", e);
    return res.status(401), json({ success: false, error: e });
  }
});

module.exports = router;
