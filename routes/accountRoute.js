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

// Edit account info page
router.get("/edit/:account_id",
  Util.checkLogin,
  Util.handleErrors(accountController.buildEditAccount))

// Process Edit Account Info page
router.post("/edit-account",
  accValidate.editAccountRules(),
  accValidate.checkEditData,
  Util.handleErrors(accountController.editAccount)
)

// Process Password Edit
router.post(
  "/edit-password",
  accValidate.editPasswordRules(),
  accValidate.checkEditData,
  Util.handleErrors(accountController.editAccountPassword)
)

// Process Logout
// Logout
router.get("/logout", Util.handleErrors(accountController.logoutAccount))

module.exports = router