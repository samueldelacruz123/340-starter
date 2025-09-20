const utilities = require("../utilities");
const baseController = {};

/* ************************
 * Build Home view
 ************************** */
baseController.buildHome = async function(req, res){
    const nav = await utilities.getNav();
    res.render("index", {title: "Home", nav})
}

/* ************************
 * Intentional Error Controller
 ************************** */
baseController.triggerError = async function(req, res, next) {
  try {
    throw new Error("This is an intentional 500 error for testing.")
  } catch (err) {
    next(err)
  }
}

module.exports = baseController;