const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId;
    const data = await invModel.getInventoryByClassificationId(classification_id);
    const grid = await utilities.buildClassificationGrid(data);
    let nav = await utilities.getNav();
    const className = data[0].classification_name;
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    });
};

/* ***************************
 *  Build detail view
 * ************************** */
invCont.buildByInventoryId = async function(req, res, next) {
  const inventoryId = req.params.inventoryId
  let nav = await utilities.getNav()

  const itemData = await invModel.getInventoryById(inventoryId)

  if (!itemData) {
    return next(new Error("No vehicle found."))
  }

  const itemHTML = utilities.buildDetailView(itemData)

  res.render("./inventory/detail", {
    title: `${itemData.inv_year} ${itemData.inv_make} ${itemData.inv_model}`,
    nav,
    itemHTML,
  })
}

module.exports = invCont;