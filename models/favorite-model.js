const pool = require("../database/");
const favoriteModel = {}

/* *****************************
 * Add Favorite
 ***************************** */
favoriteModel.addFavorite = async (account_id, inv_id) => {
    try {
        const sql = `
        INSERT INTO favorites (account_id, inv_id)
        VALUES ($1, $2)
        RETURNING favorite_id;
        `
        const result = await pool.query(sql, [account_id, inv_id])
        return result.rows[0]
    } catch (error) {
        console.error("addFavorite error:", error)
        throw error
    }
}

/* *****************************
 * Get Favorites by Account ID
 ***************************** */
favoriteModel.getFavoritesByAccountId = async (account_id) => {
    try {
        const sql = `
        SELECT f.favorite_id, f.account_id, 
            i.inv_id, i.inv_make, i.inv_model, i.inv_price, i.inv_image
        FROM favorites AS f
        JOIN inventory AS i ON f.inv_id = i.inv_id
        WHERE f.account_id = $1
        `
        const result = await pool.query(sql, [account_id])
        return result.rows
    } catch (error) {
        console.error("getFavoritesByAccountId error:", error)
        throw error
    }
}

/* *****************************
 * Remove Favorite
 ***************************** */
favoriteModel.removeFavorite = async (favorite_id) => {
    try {
        const sql = `
        DELETE FROM favorites
        WHERE favorite_id = $1;
        `
        const result = await pool.query(sql, [favorite_id])
        return result.rowCount
    } catch (error) {
        console.error("removeFavorite error:", error)
        throw error
    }
}

module.exports = favoriteModel