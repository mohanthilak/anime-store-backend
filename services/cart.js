const ErrorMessage = "Error at Cart Service Layer";
class CartService {
  cartRepo;
  constructor(CartRepo) {
    this.cartRepo = CartRepo;
  }

  async CreateCart({ products, uid, amount }) {
    try {
      const data = await this.cartRepo.CreateCart({ products, uid, amount });
      return data;
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async addProductToCart({
    id,
    productId,
    quantity,
    price,
    name,
    size,
    image,
    totalAmount,
  }) {
    try {
      const data = await this.cartRepo.addProductToCart({
        id,
        productId,
        image,
        quantity,
        price,
        name,
        size,
        totalAmount,
      });
      return data;
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const data = await this.cartRepo.removeProductFromCart(cartId, productId);
      return data;
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async GetUsersCurrentCart(uid) {
    try {
      const data = await this.cartRepo.GetUsersCurrentCart(uid);
      return data;
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async EditProductInCart({ uid, productElementId, quantity }) {
    try {
      const data = await this.cartRepo.EditProductInCart({
        uid,
        productElementId,
        quantity,
      });
      return data;
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }
  async ChangeCurrentCartToFalse(uid) {
    try {
      console.log("!!!!!!!!!!");
      const data = await this.cartRepo.ChangeCurrentCartToFalse(uid);
      return data;
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }
}

module.exports = { CartService };
