const express = require("express");
const { body } = require("express-validator");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const {
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
  getMe,
  verifySecurityAnswer,
} = require("../controllers/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Validation rules
const registerValidation = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("securityQuestion")
    .notEmpty()
    .withMessage("Please select a security question"),
  body("securityAnswer")
    .notEmpty()
    .withMessage("Please provide an answer to the security question"),
  validate,
];

const loginValidation = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
  validate,
];

const resetPasswordValidation = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validate,
];

// Auth routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/logout", auth, logout);
router.post("/forgot-password", forgotPassword);
router.post("/verify-security-answer", verifySecurityAnswer);
router.post("/reset-password", resetPasswordValidation, resetPassword);

// Get current user
router.get("/me", auth, getMe);

module.exports = router;
