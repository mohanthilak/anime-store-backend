const ErrorMessage = "Error at Products Service Layer";
class ProductService {
  productRepo;

  constructor(productRepo) {
    this.productRepo = productRepo;
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
