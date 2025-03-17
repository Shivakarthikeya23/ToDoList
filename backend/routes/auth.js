const express = require("express");
const auth = require("../middleware/auth");
const { login, register, logout } = require("../controllers/auth.js");

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.post("/logout", logout);

// Get current user
router.get("/me", auth, (req, res) => {
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  });
});

module.exports = router;
