const regValidate = require("../utilities/account-validation")

// Account routes
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const Util = require("../utilities/")

// Account Login page
router.get("/login", Util.handleErrors(accountController.buildIdLogin))

// Register page
router.get("/register", Util.handleErrors(accountController.buildRegister))

// Register a new account
router.post(
    '/register',
    regValidate.registrationRules(),
    regValidate.checkRegData,
    Util.handleErrors(accountController.registerAccount)
)

module.exports = router