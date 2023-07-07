const router = require("express").Router();
const multer = require("multer");
const {
  registerUser,
  loginUser,
  getUserInfo,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
const authenticate = require("../utils/authenticate");

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/register",
  upload.fields(["username", "email", "password"]),
  registerUser
);
router
  .route("/")
  .post(upload.fields(["email", "password"]), loginUser)
  .get(authenticate, getUserInfo);
router.post(
  "/update",
  authenticate,
  upload.fields(["username", "email", "password"]),
  updateUser
);
router.post("/delete", authenticate, upload.fields(["password"]), deleteUser);
module.exports = router;
