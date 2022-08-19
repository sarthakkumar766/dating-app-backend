const mongoose = require("mongoose");
const validator = require("validator");
// const Message = require("./Message")

const userSchema = new mongoose.Schema({
  loginId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email is required",
    validate: [validator.isEmail, "Invalid e-mail"],
  },
  firstName: {
    type: String,
    trim: true,
    required: "First Name is required",
  },
  birthdate: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 120,
  },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  sexualOrientation: {
    type: String,
    enum: ["Straight", "Gay | Lesbian", "Bisexual"],
    required: true,
  },
  interests: {
    type: [String],
    required: true,
  },
  phone: {
    type: String,
    length: 10,
    trim: true,
  },
  photo: {
    type: [validator.isURL, "Not an url"],
  },
  minDist: {
    type: Number,
    min: 5,
    max: 100,
  },
  maxDist: {
    type: Number,
    min: 10,
  },
  showAges: {
    type: Number,
    min: 18,
    max: 120,
  },

  likes: {
    type: [String], //should be sent id
  },
  dislikes: {
    type: [String], //should be sent id
  },
  superLikes: {
    type: [String], //should be sent id
  },
  recentLikes: {
    type: [String], //should be sent id
  },
  recentDislikes: {
    type: [String], //should be sent id
  },
  recentSuperLikes: {
    type: [String], //should be sent id
  },

  matches: {
    type: [String], //should be sent id
  },

  //   matchMessages: {
  // 	type: [Message.schema]
  //   }
});

module.exports = mongoose.model("User", userSchema);
