// Inventory routes
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")

// Classification pages
router.get("/type/:classificationId", invController.buildByClassificationId)

// Vehicle detail page
router.get("/detail/:inventoryId", invController.buildByInventoryId)

module.exports = router