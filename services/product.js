const ErrorMessage = "Error at Products Service Layer";
class ProductService {
  productRepo;

  constructor(productRepo) {
    this.productRepo = productRepo;
  }

  async CreateProduct({
    name,
    price,
    sizes,
    image,
    description,
    material,
    category,
    stock,
  }) {
    try {
      const data = await this.productRepo.CreateProduct({
        name,
        price,
        sizes,
        image,
        description,
        material,
        category,
        stock,
      });
      return data;
    } catch (e) {
      console.log("Error at Product service layer", e);
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
    description,
    material,
  }) {
    try {
      const data = await this.productRepo.EditProduct({
        productId,
        name,
        price,
        sizes,
        image,
        stock,
        display,
        description,
        material,
      });
      return { success: true, data };
    } catch (e) {
      console.log("Error at Product service layer", e);
      return { success: false, error: e };
    }
  }

  async DeleteProduct(id) {
    try {
      const data = await this.productRepo.DeleteProduct({ id });
      return data;
    } catch (e) {
      console.log("Error at Product Service Layer", e);
      return { success: false, error: e };
    }
  }

  async GetProductByID(id) {
    try {
      const data = await this.productRepo.GetProductByID({ id });
      return data;
    } catch (e) {
      console.log("Error at Product Service Layer", e);
      return { success: false, error: e };
    }
  }

  async GetAllProduct() {
    try {
      const data = await this.productRepo.GetAllProducts();
      return data;
    } catch (e) {
      console.log("Error at Product Service Layer", e);
      return { success: false, error: e };
    }
  }

  async GetAllDisplayProducts() {
    try {
      const data = await this.productRepo.GetAllDisplayProducts();
      return data;
    } catch (e) {
      console.log("Error at product service layer", e);
      return { success: false, error: e };
    }
  }

  async GetProductsWithCategories(categories) {
    try {
      const data = await this.productRepo.GetProductsWithCategories(categories);
      return data;
    } catch (e) {
      console.log("Error in the product repository layer", e);
      return { success: false, error: e };
    }
  }

  async GetProductsCount() {
    try {
      const data = await this.productRepo.GetProductsCount();
      return data;
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }
}

module.exports = { ProductService };
