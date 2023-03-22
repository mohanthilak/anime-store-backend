const express = require("express");
const app = express();
const cors = require("cors");
const { PORT } = require("./config/EnvVars");
const { connectDB } = require("./config/db");
const cookieParser = require("cookie-parser");
(async () => {
  // code goes here
  await connectDB();
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

const userRoutes = require("./API/routes/users");
const quizRoutes = require("./API/routes/quiz");
const productRoutes = require("./API/routes/product");
const feedbackRoutes = require("./API/routes/feedback");
const orderRoutes = require("./API/routes/order");
const cartRoutes = require("./API/routes/cart");

app.use("/", (req, res, next) => {
  console.log("Request:", req.method, req.path);
  next();
});

app.use("/user", userRoutes);
app.use("/quiz", quizRoutes);
app.use("/product", productRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/order", orderRoutes);
app.use("/cart", cartRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Anime-Store API!</h1>");
});

app.listen(PORT, () => console.log(`Serving at port ${PORT}`));
