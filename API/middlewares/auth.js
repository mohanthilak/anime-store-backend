const { verify } = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../../config/EnvVars");

const auth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  console.log("at auth middleware", token);

  if (token == null)
    return res.status(404).json({ status: 404, message: "User Not Found" });

  verify(token, ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ status: 403, message: err });
    }
    req.user = payload;
    console.log(req.user);
    return next();
  });
};

module.exports = { auth };
