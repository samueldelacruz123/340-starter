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

/* ***************************
 *  Build management view
 * ************************** */
invCont.buildManagement = async function(req, res, next) {
  try {
    let nav = await utilities.getNav()
    res.render('inventory/management', {
      title: "Vehicle Management",
      nav,
      errors: null
    })
  } catch (err) {
    next(err)
  }
}

/* ***************************
 *  Build add classification view
 * ************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null
  })
}

/* ***************************
 *  Process add classification
 * ************************** */
invCont.addClassification = async function (req, res) {
  const { classification_name } = req.body
  const addResult = await invModel.addClassification(classification_name)
  if (addResult) {
    req.flash("notice", `The ${classification_name} classification was successfully added.`)
    res.redirect("/inv")
  } else {
    let nav = await utilities.getNav()
    req.flash("notice", "Sorry, the classification could not be added.")
    res.status(501).render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      classification_name
    })
  }
}


/* ***************************
 *  Build add inventory view
 * ************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()

  res.render("./inventory/add-inventory", {
    title: "Add new Vehicle",
    nav,
    classificationList,
    errors: null,
    //sticky defaults
    inv_make: "",
    inv_model: "",
    inv_year: "",
    inv_description: "",
    inv_image: "/images/vehicles/no-image.png",
    inv_thumbnail: "/images/vehicles/no-image-tn.png",
    inv_price: "",
    inv_miles: "",
    inv_color: ""
  })
}


/* ***************************
 *  Process add inventory
 * ************************** */
invCont.addInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    classification_id,
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

  try {
    const result = await invModel.addInventory(
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color
    )

    if (result) {
      req.flash("notice", "Vehicle added successfully.")
      res.redirect("/inv/") // back to management page
    } else {
      req.flash("notice", "Failed to add vehicle.")
      let classificationList = await utilities.buildClassificationList(classification_id)
      res.status(500).render("./inventory/add-inventory", {
        title: "Add New Vehicle",
        nav,
        classificationList,
        errors: null,
        // sticky values
        classification_id,
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
    }
  } catch (err) {
    next(err)
  }
}

module.exports = invCont;