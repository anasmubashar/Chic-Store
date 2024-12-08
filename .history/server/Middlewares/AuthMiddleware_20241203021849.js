const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "No token provided" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(401).json({ status: false, message: "Invalid token" });
    }
    try {
      const user = await User.findById(data.id);
      if (user) {
        req.user = user;
        next();
      } else {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ status: false, message: "Server error" });
    }
  });
};

module.exports.isAdmin = (req, res, next) => {
  const { user } = req;

  if (!user || user.role !== "admin") {
    return res
      .status(403)
      .json({ status: false, message: "Access denied: Admins only" });
  }

  next();
};

module.exports.isDelivery = (req, res, next) => {
  const { user } = req;

  if (!user || user.role !== "delivery") {
    return res
      .status(403)
      .json({ status: false, message: "Access denied: deliverer only" });
  }
};
