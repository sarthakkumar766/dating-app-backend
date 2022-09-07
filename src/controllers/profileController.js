const dayjs = require("dayjs");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { interestsArr, genderandOtherArr } = require("../data/hardcodedValues");

const getProfileData = (req, res) => {
  const {} = req.body;
};

const setProfileData = async (req, res) => {
  const email = req.email;

  const user = await User.findOne({ email });
  if (!user) return res.status(403).json({ message: "Forbidden" });

  const profileExists = await Profile.findOne({ email });
  if (profileExists)
    return res.status(401).json({
      message: "Profile Already Exist",
      profileData: user.profileData,
    });

  const {
    firstName,
    birthDate,
    gender,
    sexualOrientation,
    privateSexualOrientation,
    interests,
  } = req.body;

  if (!firstName.trim)
    return res.status(400).json({ message: "firstName should not be empty" });

  const currDate = dayjs(new Date());
  const age = currDate.diff(dayjs(birthDate), "year");
  if (age < 18)
    return res.status(403).json({ message: "Age should be atleast 18 years" });
  if (age > 200)
    return res
      .status(403)
      .json({ message: "Age should be more than 200 years" });

  const { genderList, sexualOrientationList } = genderandOtherArr();

  const findGender = genderList.includes(gender);
  if (!findGender) return res.status(400).json({ message: "Undefined Gender" });

  const findSexualOrientation =
    sexualOrientationList.includes(sexualOrientation);
  if (!findSexualOrientation)
    return res.status(400).json({ message: "Undefined Sexual Orientation" });

  if (interests.length < 3 || interests.length > 10) {
    return res
      .status(400)
      .json({ message: "Length of interests should be between 3 and 10" });
  }

  const allInterests = interestsArr();
  const exists = interests.every((e) => allInterests.includes(e));
  if (!exists)
    return res.status(400).json({ message: "Interest doesn't match the list" });

  const profile = new Profile({
    email,
    firstName,
    birthDate,
    gender,
    sexualOrientation,
    privateSexualOrientation,
    interests,
  });

  try {
    await profile.save();
    user.profileData = true;
    await user.save();
    res.send({
      message: "success",
      profileData: user.profileData,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateProfileData = (req, res) => {
  const {} = req.body;
};

const addImages = (req, res) => {};

const getAllInterests = (req, res) => {
  const allInterests = interestsArr();
  //   console.log(allInterests);
  allInterests.length > 0
    ? res.send(allInterests)
    : res.status(500).send({ message: "Error" });
};

module.exports = {
  getProfileData,
  setProfileData,
  updateProfileData,
  addImages,
  getAllInterests,
};
