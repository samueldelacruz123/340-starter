// Inventory routes
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const Util = require("../utilities/")
const invValidate = require("../utilities/inventory-validation")

// Classification page
router.get("/type/:classificationId", Util.handleErrors(invController.buildByClassificationId))

// Vehicle detail page
router.get("/detail/:inventoryId", Util.handleErrors(invController.buildByInventoryId))

// Management page
router.get('/', Util.handleErrors(invController.buildManagement))

// Classification form
router.get("/add-classification", Util.handleErrors(invController.buildAddClassification))

// Process and validate classification
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  Util.handleErrors(invController.addClassification)
)

// Add new inventory
router.get("/add-inventory", Util.handleErrors(invController.buildAddInventory))

// Process and validate inventory
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  Util.handleErrors(invController.addInventory)
)

module.exports = router