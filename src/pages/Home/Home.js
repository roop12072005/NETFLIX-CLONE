import Navbar from "../../Components/NavBar/Navbar";
import Banner from "../../Components/Banner/Banner";
import Row from "../../Components/Row/Row";
import '../Home/Home.css';

function Home({
  movies,
  tvShows,
  watchlist, 
  addToWatchlist, 
  removeFromWatchlist, 
  setIsAuthenticated
})
{ console.log(tvShows)
  const featuredMovie = movies.popular[0]
  // const topRated = movies.filter(m =>
  //   m.tags.includes("topRated")
  // );

  // const dual_Audio = movies.filter(m =>
  //   m.tags.includes("dual audio")
  // );

  // const trendingShows = Array.isArray(tvShows)
  //   ? tvShows.filter((show) => show.tags?.includes("trending"))
  //   : [];

  // const topRatedShows = Array.isArray(tvShows)
  //   ? tvShows.filter((show) => show.tags?.includes("topRated"))
  //   : [];

  // const bingeWorthyShows = Array.isArray(tvShows)
  //   ? tvShows.filter(
  //       (show) =>
  //         show.tags?.includes("multiple seasons") || Number(show.seasons || 0) > 1
  //     )
  //   : [];
  // const storedUser = localStorage.getItem("currentUser");

let user = null;
// if (storedUser && storedUser !== "undefined") {
//   try {
//     user = JSON.parse(storedUser);
//   } catch (error) {
//     user = null;
//   }
// }

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
        title="Popular"
        tag="popular"
         movies={movies.popular}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="Top Rated"
        tag="topRated"
        movies={movies.topRated}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="Upcoming"
        tag="upcoming"
        movies={movies.upcoming}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />
      <Row
        title="latest"
        tag="dual audio"
        movies={movies.latest}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="Airing Today Shows"
        tag="airingToday"
        shows={tvShows.airingToday}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="Top Rated Shows"
        tag="topRated"
        shows={tvShows.topRated}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="On The Air Shows"
        tag="onTheAir"
        shows={tvShows.onTheAir}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />
      
    </div>
    
  );
}

export default Home;
