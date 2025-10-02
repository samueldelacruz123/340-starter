const Util = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/* **********************************
*  Classification Validation Rules
* ********************************* */
validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Please provide a classification name with at least 3 characters.")
      .isAlphanumeric("en-US", { ignore: " " })
      .withMessage("Classification name may only contain letters and numbers.")
      .escape()
  ]
}

validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        // only keep errors that have a custom .withMessage()
        let filteredErrors = errors.array().filter(err => err.msg !== 'Invalid value')

        let nav = await Util.getNav()
        res.render("inventory/add-classification", {
            title: "Add New Classification",
            nav,
            errors: filteredErrors,
            classification_name
        })
        return
    }
    next()
}

/* **********************************
*  Inventory Validation Rules
* ********************************* */
validate.inventoryRules = () => {
  return [
    body("inv_make")
      .trim()
      .notEmpty()
      .withMessage("Please provide a make.")
      .isLength({ min: 3 })
      .withMessage("Make must be at least 3 characters long.")
      .escape(),

    body("inv_model")
      .trim()
      .notEmpty()
      .withMessage("Please provide a model.")
      .isLength({ min: 3 })
      .withMessage("Model must be at least 3 characters long.")
      .escape(),

    body("inv_year")
      .notEmpty()
      .withMessage("Please provide a year.")
      .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
      .withMessage("Please enter a valid year."),

    body("inv_description")
      .trim()
      .notEmpty()
      .withMessage("Please provide a description.")
      .escape(),

    body("inv_image")
      .trim()
      .notEmpty()
      .withMessage("Please provide an image path."),

    body("inv_thumbnail")
      .trim()
      .notEmpty()
      .withMessage("Please provide a thumbnail path."),

    body("inv_price")
      .notEmpty()
      .withMessage("Please provide a price.")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number."),

    body("inv_miles")
      .notEmpty()
      .withMessage("Please provide mileage.")
      .isInt({ min: 0 })
      .withMessage("Miles must be a positive number."),

    body("inv_color")
      .trim()
      .notEmpty()
      .withMessage("Please provide a color.")
      .escape()
  ]
}

validate.checkInventoryData = async (req, res, next) => {
    const {
        classificationList,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color
    } = req.body

    let errors = validationResult(req)

    if (!errors.isEmpty()) {
        // only keep errors that have a custom .withMessage()
        let filteredErrors = errors.array().filter(err => err.msg !== 'Invalid value')

        let nav = await Util.getNav()
        res.render("inventory/add-inventory", {
            title: "Add New Vehicle",
            nav,
            classificationList,
            errors: filteredErrors,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color
        })
        return
    }
    next()
}

/* **********************************
*  Validate edited inventory
* ********************************* */
validate.checkEditData = async (req, res, next) => {
    const {
        classificationList,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
        inv_id
    } = req.body

    let errors = validationResult(req)

    if (!errors.isEmpty()) {
        // only keep errors that have a custom .withMessage()
        let filteredErrors = errors.array().filter(err => err.msg !== 'Invalid value')

        let nav = await Util.getNav()
        res.render("inventory/edit-inventory", {
            title: "Edit " + itemName,
            nav,
            classificationList,
            errors: filteredErrors,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
            inv_id
        })
        return
    }
    next()
}

module.exports = validate