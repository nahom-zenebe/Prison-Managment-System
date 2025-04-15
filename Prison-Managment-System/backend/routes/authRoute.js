const express = require("express");

const router = express.Router();
const authenticationController = require("../controllers/authenticationController");

router.route("/signup").post(authenticationController.signup);
router.route("/login").post(authenticationController.login);
module.exports = router;
