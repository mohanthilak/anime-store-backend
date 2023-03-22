const cloudinary = require("cloudinary").v2;
const {
  cloudinaryStorage,
  CloudinaryStorage,
} = require("multer-storage-cloudinary");
const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
} = require("./EnvVars");

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "anime-store",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
