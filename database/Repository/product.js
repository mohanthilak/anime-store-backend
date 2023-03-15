const productModel = require("../Models/products");

class ProductRepository {
  async CreateProduct({ name, price, size }) {
    try {
      const product = new productModel({ name, price, size });
      await product.save();
      return { success: true, data: product };
    } catch (e) {
      console.log("Error while creating a product", e);
      return { success: false, error: e };
    }
  }

  async EditProduct({ id, name, price, size }) {
    try {
      const product = await productModel.findById(id);
      if (name) product.name = name;
      if (price) product.price = price;
      if (size) product.size = size;
      await product.save();
      return { success: true, data: product };
    } catch (e) {
      console.log("Error while Editing a product", e);
      return { success: false, error: e };
    }
  }

  async DeleteProduct({ id }) {
    try {
      const product = await productModel.findOneAndDelete({ _id: id });
      return { success: true, data: product };
    } catch (e) {
      console.log("Error while deleting a product", e);
      return { success: false, error: e };
    }
  }

  async GetProductByID({ id }) {
    try {
      const product = await productModel.findOne({ _id: id });
      return { success: true, data: product };
    } catch (e) {
      console.log("Error while deleting a product", e);
      return { success: false, error: e };
    }
  }

  async GetAllProducts() {
    try {
      const products = await productModel.find({}).lean();
      return { success: true, data: products };
    } catch (e) {
      console.log("Error while getting all products", e);
      return { success: false, error: e };
    }
  }

  async GetProductsCount() {
    try {
      const count = await productModel.count();
      return { success: true, count };
    } catch (e) {
      console.log("Error while getting total products count", e);
      return { success: false, error: e };
    }
  }
}

module.exports = { ProductRepository };
