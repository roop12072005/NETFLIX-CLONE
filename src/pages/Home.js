import { useState } from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Row from "../Components/Row";
import '../Home.css';

function Home({
  movies,
  tvShows,
  loading,
  watchlist, 
  addToWatchlist, 
  removeFromWatchlist 
})
{
  const featuredMovie =
    movies.find((movie) => movie.title?.toLowerCase().includes("john wick")) ||
    movies.find((movie) => movie.tags?.includes("trending")) ||
    movies[0];

  const trending = movies.filter(m =>
    m.tags.includes("trending")
  );

  const topRated = movies.filter(m =>
    m.tags.includes("topRated")
  );

  const dual_Audio = movies.filter(m =>
    m.tags.includes("dual audio")
  );

  const trendingShows = Array.isArray(tvShows)
    ? tvShows.filter((show) => show.tags?.includes("trending"))
    : [];

  const topRatedShows = Array.isArray(tvShows)
    ? tvShows.filter((show) => show.tags?.includes("topRated"))
    : [];

  const bingeWorthyShows = Array.isArray(tvShows)
    ? tvShows.filter(
        (show) =>
          show.tags?.includes("multiple seasons") || Number(show.seasons || 0) > 1
      )
    : [];

  const [genreFilter, setGenreFilter] = useState("All");
  const filterMedia = (items) => {
    if (!items || !Array.isArray(items)) {
      return [];
    }

    if (genreFilter === "All") return items;

    return items.filter(
      (item) => item.genre?.toLowerCase().includes(genreFilter.toLowerCase())
    );
  };
  return (
    <div className="App">
      <Navbar setGenreFilter={setGenreFilter}/>
      <Banner
        featuredMovie={featuredMovie}
        watchlist={watchlist}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
      />

      <Row
        title="Trending Now"
        tag="trending"
        movies={filterMedia(trending).slice(0, 10)}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="Top Rated"
        tag="topRated"
        movies={filterMedia(topRated).slice(0, 10)}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="Dual Audio"
        tag="dual audio"
        movies={filterMedia(dual_Audio).slice(0, 10)}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="Trending Shows"
        tag="trending"
        movies={filterMedia(trendingShows).slice(0, 10)}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="Top Rated Shows"
        tag="topRated"
        movies={filterMedia(topRatedShows).slice(0, 10)}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="Binge-Worthy Shows"
        tag="multiple seasons"
        movies={filterMedia(bingeWorthyShows).slice(0, 10)}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />
      
    </div>
    
  );
}

// Inside your React component (Home.js)




export default Home;
