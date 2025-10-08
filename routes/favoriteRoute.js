const express = require("express")
const router = express.Router()
const favoriteController = require("../controllers/favoriteController")
const Util = require("../utilities/")

// Protect all routes - user must be logged in
router.use(Util.checkLogin)

// View Favorites
router.get("/", Util.handleErrors(favoriteController.getFavorites))

// Add Favorite
router.post("/add", Util.handleErrors(favoriteController.addFavorite))

// Remove Favorite
router.post("/remove", Util.handleErrors(favoriteController.removeFavorite))

module.exports = router