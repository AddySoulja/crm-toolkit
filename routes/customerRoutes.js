const router = require("express").Router();
const multer = require("multer");
const { registerCustomer } = require("../controllers/customerControllers");
const authenticate = require("../utils/authenticate");

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/register",
  authenticate,
  upload.fields(["name", "email", "phone", "address", "info"]),
  registerCustomer
);

module.exports = router;
