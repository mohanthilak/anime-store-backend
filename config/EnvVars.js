const { config } = require("dotenv");

console.log("NODE_ENV: ", process.env.NODE_ENV);

if (process.env.NODE_ENV !== "prod") {
  config({ path: "./.dev.env" });
} else {
  config({ path: "./.env" });
}

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;

console.log("DB_URL:", DB_URL);

module.exports = {
  PORT,
  DB_URL,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  CLOUDINARY_SECRET,
  CLOUDINARY_KEY,
  CLOUDINARY_CLOUD_NAME,
};
