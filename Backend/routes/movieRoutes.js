const express = require("express");
const axios = require("axios");

const transformMovie = require("../utils/moviesTransformer");
const router = express.Router();
const {
  getMovieCache,
  setMovieCache
} = require("../services/movieCache")
const headers = {
  Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
  accept: "application/json",
};

// Trending


router.get("/", async (req, res) => {
  console.log("loaded from the cache")
  const cache = getMovieCache();
  if(cache){
    return res.json(cache);
  }

  try {
    const [popularResponse, topRatedResponse , upcomingResponse , latestResponse] = await Promise.all([
      axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        { headers }
      ),
      axios.get(
        "https://api.themoviedb.org/3/movie/top_rated",
        { headers }
      ),
      axios.get(
        "https://api.themoviedb.org/3/movie/upcoming",
      {headers}
    ),
    axios.get(
      "https://api.themoviedb.org/3/movie/latest",
      {headers}
    )
    ]);
    const popularMovies = popularResponse.data.results.map(transformMovie);
    const topRatedMovies = topRatedResponse.data.results.map(transformMovie);
    const upcomingMovies = upcomingResponse.data.results.map(transformMovie)
    const latestMovies = latestResponse.data ? [transformMovie(latestResponse.data)] : [];
    const allMovies = [
      ...popularMovies,
      ...topRatedMovies,
      ...upcomingMovies,
      ...latestMovies
    ];
    
    const uniqueMovies = [
      ...new Map(allMovies.map(movie => [movie.id, movie])).values()
    ];
    
    setMovieCache({
      movies: {
        popular: popularMovies,
        topRated: topRatedMovies,
        upcoming: upcomingMovies,
        latest: latestMovies,
        allMovies: uniqueMovies
      }
    });
    
    res.json(getMovieCache());
    console.log("Loaded by fetching")
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({
      message: "Error fetching movies"
    });
  }
});

// // Popular Movies
// router.get("/", async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://api.themoviedb.org/3/movie/popular",
//       { headers }
//     );

//     res.json(response.data.results);
//   } catch (err) {
//     console.error(err.response?.data || err.message);
//     res.status(500).json({ message: "Error fetching movies" });
//   }
// });

module.exports = router;