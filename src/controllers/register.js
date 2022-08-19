const User = require("../models/User");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = new User({
    email,
    password,
  });
  const emailExists = await User.findOne({ email });
  if (emailExists) return res.status(409).send("Email already exists");
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = register;
