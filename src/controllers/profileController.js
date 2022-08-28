const Profile = require("../models/Profile");

const getProfileData = (req, res) => {
  const {} = req.body;
};

const setProfileData = async(req, res) => {
  const loginId = "id1";
  const { email, firstName, birthdate, gender, sexualOrientation, interests } =
    req.body;

  const profile = new Profile({
    loginId,
    email,
    firstName,
    birthdate,
    gender,
    sexualOrientation,
    interests,
  });

  try {
    const savedprofile = await profile.save();
    res.send(savedprofile);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateProfileData = (req, res) => {
  const {} = req.body;
};

const addImages = (req, res) => {

}

module.exports = { getProfileData, setProfileData, updateProfileData, addImages };
