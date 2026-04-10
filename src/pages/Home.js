import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Row from "../Components/Row";
import '../Home.css';

function Home({
  movies,
  tvShows,
  watchlist, 
  addToWatchlist, 
  removeFromWatchlist, 
  setIsAuthenticated
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
  const storedUser = localStorage.getItem("currentUser");

let user = null;

if (storedUser && storedUser !== "undefined") {
  try {
    user = JSON.parse(storedUser);
  } catch (error) {
    user = null;
  }
}

  return (
    <div className="App">
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      <h2>Welcome, {user?.email}</h2>
      <Banner
        featuredMovie={featuredMovie}
        watchlist={watchlist}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
      />

      <Row
        title="Trending Now"
        tag="trending"
        movies={trending.slice(0, 10)}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="Top Rated"
        tag="topRated"
        movies={topRated.slice(0, 10)}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="Dual Audio"
        tag="dual audio"
        movies={dual_Audio.slice(0, 10)}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="Trending Shows"
        tag="trending"
        movies={trendingShows.slice(0, 10)}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="Top Rated Shows"
        tag="topRated"
        movies={topRatedShows.slice(0, 10)}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="Binge-Worthy Shows"
        tag="multiple seasons"
        movies={bingeWorthyShows.slice(0, 10)}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />
      
    </div>
    
  );
}

export default Home;
