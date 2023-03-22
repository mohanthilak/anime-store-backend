const cartModel = require("../Models/cart");
const ErrorMessage = "Error at Cart Repository layer";
class CartRepository {
  async CreateCart({ products, uid, amount }) {
    try {
      const cart = new cartModel({ products, uid, amount });
      await cart.save();
      return { success: true, data: cart };
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async addProductToCart({
    id,
    productId,
    image,
    quantity,
    price,
    size,
    name,
    totalAmount,
  }) {
    try {
      const cart = await cartModel.findOne({ uid: id, current: true });
      console.log("cart from db", cart);
      cart.products.push({
        productId,
        image,
        quantity,
        name,
        price,
        size,
        totalAmount,
      });
      cart.amount += totalAmount;
      await cart.save();
      return { success: true, data: cart };
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await cartModel.updateOne(
        { _id: cartId },
        { $pull: { products: productId } }
      );
      return { success: true, data: cart };
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async EditProductInCart({ uid, productElementId, quantity }) {
    try {
      const cart = await cartModel.updateOne(
        { uid, current: true, "products._id": productElementId },
        { $set: { "products.$.quantity": quantity } }
      );
      return { success: true, data: cart };
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async GetUsersCurrentCart(uid) {
    try {
      const cart = await cartModel.findOne({ uid, current: true }).lean();
      return { success: true, data: cart };
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async ChangeCurrentCartToFalse(uid) {
    try {
      const cart = await cartModel.findOne({ uid, current: true });
      cart.current = false;
      cart.save();
      console.log(cart);
      return { success: true, data: cart };
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }
}

module.exports = { CartRepository };
