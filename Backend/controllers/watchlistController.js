const { addToWatchlist, removeFromWatchlist } = require("../models/watchlistModel");
const { getCompleteWatchlist } = require("../services/watchlistService");
const addMovie = async (req, res) => {
    try {

        const { movie_id, media_type } = req.body;

        const userId = req.user.id;

        if (!movie_id || !media_type) {
            return res.status(400).json({
                success: false,
                message: "Movie ID and media type are required."
            });
        }

        await addToWatchlist(
            userId,
            movie_id,
            media_type
        );

        return res.status(201).json({
            success: true,
            message: "Movie added to watchlist."
        });

    } catch (error) {

        console.error(error);

        if(error.code == "ER_DUP_ENTRY"){
            return res.status(409).json({
                success: false,
                message: "Movie already exists in the watchlist."
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const getWatchlist = async (req, res) => {
    try {

        const userId = req.user.id;

        const watchlist = await getCompleteWatchlist(userId);

        return res.status(200).json({
            success: true,
            watchlist
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const deleteMovie = async (req, res) => {
    try {

        const userId = req.user.id;

        const { movieId } = req.params;

        const { media_type } = req.body;

        const result = await removeFromWatchlist(
            userId,
            movieId,
            media_type
        );

        if(result.affectedRows === 0){
            return res.status(404).json({
                success: false,
                message: "Movie not found in the whishlist"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Movie removed from watchlist."
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

module.exports = {
    addMovie,
    getWatchlist,
    deleteMovie
};