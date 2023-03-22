const express = require("express");
const router = express.Router();
const { UserService } = require("../../services/users");
const { QuizService } = require("../../services/quiz");
const { ProductService } = require("../../services/product");

const { UserRepository } = require("../../database/Repository/users");
const { ProductRepository } = require("../../database/Repository/product");
const { QuizRepository } = require("../../database/Repository/quiz");

const userRepo = new UserRepository();
const quizRepo = new QuizRepository();
const productRepo = new ProductRepository();

const quizService = new QuizService(quizRepo, userRepo);
const productService = new ProductService(productRepo);
const userservice = new UserService(userRepo);

const multer = require("multer");
const { storage, cloudinary } = require("../../config/cloudinary");
const upload = multer({ storage: storage });

router.post("/create-single", upload.single("image"), async (req, res) => {
  const file = req.file.path;
  console.log(req.file);
  const { name, price, description, material, stock } = req.body;
  console.log(req.body);
  let sizes = [];
  let category = [];
  for (let key in req.body) {
    if (key.includes("size")) {
      sizes.push(req.body[key]);
    }
  }
  for (let key in req.body) {
    if (key.includes("category")) {
      category.push(req.body[key]);
    }
  }

  const data = await productService.CreateProduct({
    name,
    price,
    sizes,
    image: file,
    stock,
    category,
    material,
    description,
  });
  console.log(data);
  if (data.success) return res.status(200).json(data);
  return res.status(200).json(data);
});

router.get("/single/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productService.GetProductByID({ id });
    if (data.sucess) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while handling get product by id", e);
    return res.status(401).json({ success: false, error: e });
  }
});

router.get("/internal/all-products", async (req, res) => {
  console.log("GetAllProductGetAllProductGetAllProductGetAllProduct");
  try {
    const data = await productService.GetAllProduct();
    if (data.sucess) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while handling get all products ", e);
    return res.status(401).json({ success: false, error: e });
  }
});

router.get("/display/all-products", async (req, res) => {
  try {
    const data = await productService.GetAllDisplayProducts();
    if (data.success) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while handling display all products", e);
    return res.status(200).json({ success: false, error: e });
  }
});

router.post("/display/products-category", async (req, res) => {
  try {
    const { categories } = req.body;
    const data = await productService.GetProductsWithCategories(categories);
    if (data.success) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while handling display products with category", e);
    return { sucess: false, error: e };
  }
});

router.post("/edit-single/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, sizes, stock, display, description, material } =
      req.body;
    const image = req.file;
    const data = await productService.EditProduct({
      productId: id,
      name,
      price,
      sizes,
      image,
      stock,
      display,
      description,
      material,
    });
    if (data.success) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while handling edit product ", e);
    return res.status(401).json({ success: false, error: e });
  }
});

router.delete("/delete-single/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productService.DeleteProduct(id);
    if (data.sucess) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while handling delete product", e);
    return res.status(401).json({ success: false, error: e });
  }
});

module.exports = router;
