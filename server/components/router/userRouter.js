const express = require("express");
const { generateOtp, verifyOtp } = require("../controllers/userController");

const router = express.Router();

router.route("/generaOtp").post(generateOtp);
router.route("/verifyOtp").post(verifyOtp);
router.route("/viewprofile").get();

module.exports = router;
