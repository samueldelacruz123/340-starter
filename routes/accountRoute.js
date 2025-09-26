const accValidate = require("../utilities/account-validation")

// Account routes
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const Util = require("../utilities/")

// Login page
router.get("/login", Util.handleErrors(accountController.buildIdLogin))

// Register page
router.get("/register", Util.handleErrors(accountController.buildRegister))

// Register a new account
router.post(
    '/register',
    accValidate.registrationRules(),
    accValidate.checkRegData,
    Util.handleErrors(accountController.registerAccount)
)

// Login route
router.post(
  "/login",
  accValidate.loginRules(),
  accValidate.checkLoginData,
  Util.handleErrors(accountController.loginAccount)
)

module.exports = router