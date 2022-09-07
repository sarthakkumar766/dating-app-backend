const mongoose = require("mongoose");
const validator = require("validator");
// const Message = require("./Message")

const urlCheck = (val) => {
  for (let i = 0; i < val.length; i++) {
    if (!validator.isURL(val[i])) return false;
  }
};

const profileSchema = new mongoose.Schema({
  //   loginId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     // type: String,
  //     required: true,
  //   },
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
  birthDate: {
    type: Date,
    required: true,
  },
  //   age: {
  //     type: Number,
  //     required: true,
  //     min: 18,
  //     max: 120,
  //   },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  sexualOrientation: {
    type: String,
    enum: ["Straight", "Homosexual", "Bisexual"],
    required: true,
  },
  privateSexualOrientation: {
    type: Boolean,
    default: false,
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
  photos: {
    type: [String],
    validate: [urlCheck, "Not an url"],
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

module.exports = mongoose.model("Profile", profileSchema);
