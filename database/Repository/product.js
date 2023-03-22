const productModel = require("../Models/products");

class ProductRepository {
  async CreateProduct({
    name,
    price,
    sizes,
    image,
    stock,
    category,
    material,
    description,
  }) {
    try {
      const product = new productModel({
        name,
        price,
        sizes,
        image,
        stock,
        category,
        material,
        description,
      });
      await product.save();
      return { success: true, data: product };
    } catch (e) {
      console.log("Error while creating a product", e);
      return { success: false, error: e };
    }
  }

  async EditProduct({
    productId,
    name,
    price,
    sizes,
    image,
    stock,
    display,
    category,
  }) {
    try {
      const product = await productModel.findById(productId);
      if (name) product.name = name;
      if (price) product.price = price;
      if (sizes) product.sizes = sizes;
      if (image) product.image = image.path;
      if (stock) product.stock = stock;
      if (display) product.display = display;
      if (category) product.category = category;
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
      console.log(id, typeof id.id);
      const product = await productModel.findOne({ _id: id.id });
      //   const product = await productModel.findById(id);
      return { success: true, data: product };
    } catch (e) {
      console.log("Error in the product repository layer", e);
      return { success: false, error: e };
    }
  }

  async GetAllProducts() {
    try {
      console.log("GetAllProductGetAllProductGetAllProductGetAllProduct");
      const products = await productModel.find({}).lean();
      return { success: true, data: products };
    } catch (e) {
      console.log("Error while getting all products", e);
      return { success: false, error: e };
    }
  }

  async GetAllDisplayProducts() {
    try {
      const products = await productModel.find({ display: true });
      return { success: true, data: products };
    } catch (e) {
      console.log("Error at product repository layer", e);
      return { success: false, error: e };
    }
  }

  async GetProductsWithCategories(categories) {
    try {
      const data = await productModel.find({
        display: true,
        category: { $in: categories },
      });
      return { success: true, data };
    } catch (e) {
      console.log("Error at product repository layer", e);
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
