const genre_id = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    37: "Western"
};
function transformMovie(movie) {
    return {
        id: movie.id,
        title: movie.title,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
        description: movie.overview,
        year: movie.release_date?.split("-")[0],
        rating: movie.vote_average,
        genres: (movie.genre_ids || movie.genres?.map(genre => genre.id) || [])
            .map(id => genre_id[id] || "Unknown"),
        trailer: null,
        orignal_title: movie.orignal_title,
        orignal_language: movie.orignal_language,
        
    };
}

module.exports = transformMovie;