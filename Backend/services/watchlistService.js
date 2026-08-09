const { getMovieCache, getTvCache } = require("./movieCache");

const { getMovieById, getTvShowById } = require("./tmdbServices");

const { getWatchlistByUser } = require("../models/watchlistModel");

const getCompleteWatchlist = async(userId) => {
    const rows = await getWatchlistByUser(userId);
    const movieCache = getMovieCache();
    const showCache = getTvCache();
    
    const movies = await Promise.all(

        rows.map(async(items) =>{
            if(items.media_type === "movie"){
                const cachedMovie = movieCache?.movies.allMovies.find(
                    movie => movie.id === items.movie_id
                );
                if(cachedMovie){
                    return cachedMovie;
                }
                return await getMovieById(items.movie_id);
            }
            if(items.media_type === "tv"){
                const cachedShow = showCache?.tv.allTvShows.find(
                    show => show.id === items.movie_id
                );
                if(cachedShow){
                    return cachedShow;
                }
                return await getTvShowById(items.movie_id);
            }
        })
    );
     
    return movies;
}
module.exports = {getCompleteWatchlist};