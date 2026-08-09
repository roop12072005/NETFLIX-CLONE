const axios = require("axios");

const headers = {
    Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    accept: "application/json",
}

const transformMovie = require("../utils/moviesTransformer");
const transformTvShows = require("../utils/tvShowsTransformer");

const getMovieById = async (movieId) => {

    const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        { headers }
    );

    return transformMovie(response.data);
};

const getShowById = async (showId) => {
    const response = await azios.get(
        `https://api.themoviedb.org/3/tv/${showId}`,
        { headers }
    );

    return transformTvShows(response.data);
}

module.exports = {
    getMovieById,
    getShowById
}
