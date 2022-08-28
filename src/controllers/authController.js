const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAccessToken = (foundUser) => {
  return jwt.sign(
    {
      UserInfo: {
        email: foundUser.email,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1m" }
  );
};

const getRefreshToken = (foundUser) => {
  return jwt.sign(
    { email: foundUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "10 days",
    }
  );
};

const register = async (req, res) => {
  const { email, password } = req.body;

  // Confirm data
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) return res.status(409).send("Email already exists");

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const user = new User({
    email,
    password: hashedPwd,
  });
  try {
    const savedUser = await user.save();
    if (!savedUser) res.status(400).json({ message: "Invalid user data received" });
    const accessToken = getAccessToken(savedUser);
    const refreshToken = getRefreshToken(savedUser);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Confirm data
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.status(401).json({ message: "Unauthorized" });

  const accessToken = getAccessToken(foundUser);
  const refreshToken = getRefreshToken(foundUser);

  res.json({ accessToken, refreshToken });

  //   // Create secure cookie with refresh token
  //   res.cookie("jwt", refreshToken, {
  //     httpOnly: true, //accessible only by web server
  //     secure: true, //https
  //     sameSite: "None", //cross-site cookie
  //     maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  //   });

  // Send accessToken containing email and roles

  //   try {

  //     res.send(savedUser);
  //   } catch (err) {
  //     res.status(400).send(err);
  //   }
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      const email = decoded.email;
      const foundUser = await User.findOne({ email });
      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });
      const accessToken = getAccessToken(foundUser);
      res.json({ accessToken });
    }
  );

  //   const cookies = req.cookies;

  //   if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  //   const refreshToken = cookies.jwt;

  //   jwt.verify(
  //     refreshToken,
  //     process.env.REFRESH_TOKEN_SECRET,
  //     asyncHandler(async (err, decoded) => {
  //       if (err) return res.status(403).json({ message: "Forbidden" });

  //       const foundUser = await User.findOne({
  //         email: decoded.email,
  //       }).exec();

  //       if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

  //       const accessToken = jwt.sign(
  //         {
  //           UserInfo: {
  //             email: foundUser.email,
  //             roles: foundUser.roles,
  //           },
  //         },
  //         process.env.ACCESS_TOKEN_SECRET,
  //         { expiresIn: "1m" }
  //       );

  //       res.json({ accessToken });
  //     })
  //   );
};

const logout = async () => {};

module.exports = { register, login, logout, refresh };
