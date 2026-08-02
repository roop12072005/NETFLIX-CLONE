const express = require("express");
const axios = require("axios")

// to transform teh shows
const transformTvShow = require("../utils/tvShowsTransformer")
const router = express.Router();

const headers = {
    Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    accept : "application/json",
};

router.get("/" , async(req , res) => {
    try {
        const [popularResponse , topRatedResponse , onTheAirResponse , airingTodayResponse ] = await Promise.all([
            axios.get(
                "https://api.themoviedb.org/3/tv/popular",
                { headers}
            ),
            axios.get(
                "https://api.themoviedb.org/3/tv/top_rated",
                { headers}
            ),
            axios.get(
                "https://api.themoviedb.org/3/tv/on_the_air",
                { headers}
            ),
            axios.get(
                "https://api.themoviedb.org/3/tv/airing_today",
                { headers}
            )
        ]);
        const popularShows = popularResponse.data.results.map(transformTvShow);
        const topRatedShows = topRatedResponse.data.results.map(transformTvShow);
        const airingTodayShows = airingTodayResponse.data.results.map(transformTvShow);
        const onTheAirShows = onTheAirResponse.data.results.map(transformTvShow);
        const allShows = [...popularShows, ...topRatedShows, ...onTheAirShows, ...airingTodayShows]
        const uniqueShows = [...new Map(
            allShows.map(show => [show.id, show])).values()
        ];

        res.json({
            shows: {
                popular : popularShows,
                topRated : topRatedShows,
                airingToday : airingTodayShows,
                onTheAir: onTheAirShows,
                allShows: uniqueShows
            }
        });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({
            message: "Error fetching shows"
        });
    }
});

module.exports = router;