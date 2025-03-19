const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    securityQuestion: {
      type: String,
      required: [true, "Security question is required"],
      enum: [
        "What is your mother's maiden name?",
        "What was your first pet's name?",
        "What is the name of your childhood best friend?",
        "What is your favorite book?",
        "What is your favorite movie?",
      ],
    },
    securityAnswer: {
      type: String,
      required: [true, "Security answer is required"],
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
