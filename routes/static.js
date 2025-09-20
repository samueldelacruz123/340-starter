const express = require('express');
const router = express.Router();
const baseController = require("../controllers/baseController");

// Static Routes
router.use(express.static("public"));
router.use("/css", express.static(__dirname + "public/css"));
router.use("/js", express.static(__dirname + "public/js"));
router.use("/images", express.static(__dirname + "public/images"));

// Intentional error route
router.get("/trigger-error", baseController.triggerError);

module.exports = router;



