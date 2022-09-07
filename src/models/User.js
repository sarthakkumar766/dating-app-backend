const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email is required",
      validate: [validator.isEmail, "Invalid e-mail"],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password can't be shorter than 8 characters"],
      maxlength: [1024, "Password can't be longer than 1024 characters"],
    },
    profileData: {
      type: Boolean,
      default: false,
    },
    imageData: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
