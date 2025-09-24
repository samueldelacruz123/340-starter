// Inventory routes
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const Util = require("../utilities/")

// Classification pages
router.get("/type/:classificationId", Util.handleErrors(invController.buildByClassificationId))

// Vehicle detail page
router.get("/detail/:inventoryId", Util.handleErrors(invController.buildByInventoryId))

module.exports = router