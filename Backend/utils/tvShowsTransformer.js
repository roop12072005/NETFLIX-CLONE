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

function transformTvShows(tvShow) {
    return {
        id: tvShow.id,
        title: tvShow.name,
        poster: `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`,
        description: tvShow.overview,
        year: tvShow.first_air_date?.split("-")[0],
        rating: tvShow.vote_average,
        genres: tvShow.genre_ids.map(id => genre_id[id] || "Unknown"),
        trailer: null,
        show: true
    };
}

module.exports = transformTvShows;