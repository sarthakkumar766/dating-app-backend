const router = require("express").Router();
const profileController = require("../controllers/profileController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(profileController.getProfileData)
  .post(profileController.setProfileData)
  .patch(profileController.updateProfileData);

router.route("/image").post(profileController.addImages);

router.route("/allInterests").get(profileController.getAllInterests)

module.exports = router;
