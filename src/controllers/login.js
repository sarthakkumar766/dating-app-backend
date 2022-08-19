const User = require("../models/User");
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(403).send("Email doesn't exist");
  if (user.password !== password) return res.status(403).send("Wrong Password");
  res.send("login success");
  //   try {

  //     res.send(savedUser);
  //   } catch (err) {
  //     res.status(400).send(err);
  //   }
};

module.exports = register;
