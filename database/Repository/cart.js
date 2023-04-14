const cartModel = require("../Models/cart");
const ErrorMessage = "Error at Cart Repository layer";
const {Types} = require("mongoose")

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
      const cart = await cartModel.findById(cartId);
      cart.products.forEach((el, i)=>{
        if(el._id.toString() === productId){
          cart.products.splice(i, 1);
          return;
        }
      })
      await cart.save()
      return { success: true, data: cart };
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async EditProductInCart({ uid, productElementId, quantity }) {
    try {
      // const cart = await cartModel.updateOne(
      //   { uid, current: true, "products._id": productElementId },
      //   { $set: { "products.$.quantity": quantity } }
      // );
      const cart = await cartModel.findOne({uid, current: true});
      console.log(cart)
      cart.products.forEach((el, i)=>{
        if(el._id.toString() === productElementId){
          console.log(cart.products[i].quantity, quantity)
          cart.amount = cart.amount - cart.products[i].price*cart.products[i].quantity;
          cart.products[i].quantity = quantity;
          cart.amount = cart.products[i].quantity * cart.products[i].price; 
          return; 
        }
      })
      console.log(cart)
      await cart.save()
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
