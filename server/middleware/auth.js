const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    console.log("Auth token:", token);

    if (!token) {
      throw new Error("No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    const user = await User.findById(decoded.id);
    console.log("Found user:", user);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ error: "Please authenticate" });
  }
};

module.exports = auth;
