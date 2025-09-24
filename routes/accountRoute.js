// Account routes
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const Util = require("../utilities/")

// Account Login page
router.get("/login", Util.handleErrors(accountController.buildIdLogin))

module.exports = router