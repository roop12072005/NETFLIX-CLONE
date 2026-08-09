import api from "./api";

export const getWatchlist = () =>
    api.get("/watchlist");

export const addMovie = (movieId, mediaType) =>
    api.post("/watchlist", {
        movie_id: movieId,
        media_type: mediaType
    });

export const removeMovie = (movieId, mediaType) =>
    api.delete(`/watchlist/${movieId}`, {
        data: {
            media_type: mediaType
        }
    });