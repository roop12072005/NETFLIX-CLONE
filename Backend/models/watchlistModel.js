const db = require("../config/db");

const addToWatchlist = async (userId, movieId, mediaType) => {
    const [result] = await db.query(
        "INSERT INTO watchlist (user_id, movie_id, media_type) VALUES (?, ?, ?)", [userId, movieId, mediaType]
    );
    return result;
}
const getWatchlist = async (userId) => {
    const [rows] = await db.query(
        "SELECT * FROM watchlist WHERE user_id = ?", [userId]
    );
    return rows;
};

const removeFromWatchlist = async (userId, movieId, mediaType) => {
    const [result] = await db.query(
        "DELETE FROM watchlist WHERE user_id = ? AND movie_id = ? AND media_type= ?", [userId, movieId, mediaType]
    );
    return result;
};



module.exports = {
    addToWatchlist,
    getWatchlist,
    getWatchlistByUser: getWatchlist,
    removeFromWatchlist
};