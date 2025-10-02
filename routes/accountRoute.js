// Account routes
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const Util = require("../utilities/")
const accValidate = require("../utilities/account-validation")

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

// Account Management page
router.get("/management",
  Util.checkLogin, 
  Util.handleErrors(accountController.buildManagement))

module.exports = router