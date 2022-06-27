const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const ReportController = require("../controllers/ReportController");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/sendReport", ReportController.sendReport);

module.exports = router;
