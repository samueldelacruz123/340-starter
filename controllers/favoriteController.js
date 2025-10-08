const favoriteModel = require("../models/favorite-model")
const favoriteController = {}

/* **********************************
 * Add Favorite
 ********************************** */
favoriteController.addFavorite = async (req, res) => {
    try {
        const { account_id, inv_id } = req.body

        if (!account_id || !inv_id) {
        req.flash("notice", "Missing account or inventory ID.")
        return res.redirect("back")
        }

        await favoriteModel.addFavorite(account_id, inv_id)
        req.flash("notice", "Added to favorites!")
        res.redirect("back")
    } catch (error) {
        console.error("addFavorite controller error:", error)
        req.flash("notice", "Failed to add to favorites.")
        res.redirect("back")
    }
}

/* **********************************
 * Get Favorites for a User
 ********************************** */
favoriteController.getFavorites = async (req, res) => {
  try {
    const account_id = res.locals.accountData.account_id

    const favorites = await favoriteModel.getFavoritesByAccountId(account_id)
    const nav = await require("../utilities/").getNav()  // ✅ Add this line

    res.render("account/favorites", {
      title: "My Favorites",
      nav, // ✅ Pass it here
      favorites,
      errors: null,
    })
  } catch (error) {
    console.error("getFavorites controller error:", error)
    req.flash("notice", "Failed to load favorites.")
    res.redirect("/account/")
  }
}

/* **********************************
 * Remove Favorite
 ********************************** */
favoriteController.removeFavorite = async (req, res) => {
    try {
        const { favorite_id } = req.body

        if (!favorite_id) {
        req.flash("notice", "Missing favorite ID.")
        return res.redirect("back")
        }

        await favoriteModel.removeFavorite(favorite_id)
        req.flash("notice", "Removed from favorites.")
        res.redirect("back")
    } catch (error) {
        console.error("removeFavorite controller error:", error)
        req.flash("notice", "Failed to remove favorite.")
        res.redirect("back")
    }
}

module.exports = favoriteController