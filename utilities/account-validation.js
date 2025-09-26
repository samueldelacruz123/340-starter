const Util = require(".")
const accountModel = require("../models/account-model")
const { body, validationResult } = require("express-validator")
const validate = {}

/* **********************************
*  Registration Data Validation Rules
* ********************************* */
validate.registrationRules = () => {
    return [
        // firstname is required and must be a string
        body("account_firstname")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a first name."),

        // lastname is required and must be a string
        body("account_lastname")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a last name."),

        // valid email is required and cannot already exist in the DB
        body("account_email")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .normalizeEmail()
            .withMessage("Please provide a valid email address.")
            .custom(async (account_email) => {
                const emailExists = await accountModel.checkExistingEmail(account_email)
                if (emailExists) {
                    throw new Error("Email exists. Please log in or use different email.")
                }
            }),
        
        // password is required and must be strong
        body("account_password")
            .trim()
            .notEmpty()
            .isStrongPassword({
                minLength: 12,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
            .withMessage("Please provide a password that meets the requirements.")
    ]
}

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email } = req.body
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        // only keep errors that have a custom .withMessage()
        let filteredErrors = errors.array().filter(err => err.msg !== 'Invalid value')

        let nav = await Util.getNav()
        res.render("account/register", {
        errors: filteredErrors,
        title: "Registration",
        nav,
        account_firstname,
        account_lastname,
        account_email,
        })
        return
    }
next()
}

/* **********************************
*  Login Data Validation Rules
* ********************************* */
validate.loginRules = () => {
    return [
        // email is required and must be valid
        body("account_email")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .normalizeEmail()
            .withMessage("Please provide a valid email address."),
        
        // password is required (no need for strong rules here)
        body("account_password")
            .trim()
            .notEmpty()
            .withMessage("Please provide your password.")
    ]
}

/* ******************************
 * Check data and return errors or continue
 * ***************************** */
validate.checkLoginData = async (req, res, next) => {
    const { account_email } = req.body
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        // only keep errors that have a custom .withMessage()
        let filteredErrors = errors.array().filter(err => err.msg !== 'Invalid value')

        let nav = await Util.getNav()
        res.render("account/login", {
        errors: filteredErrors,
        title: "Login",
        nav,
        account_email,
        })
        return
    }
next()
}

module.exports = validate