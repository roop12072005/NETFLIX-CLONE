import { useState } from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Row from "../Components/Row";
import '../Home.css';

function Home({
  trending, 
  topRated,
  actionMovies,
  loading,
  watchlist, 
  addToWatchlist, 
  removeFromWatchlist 
})
{
  const [genreFilter, setGenreFilter] = useState("All");
  const filterMovies = (movies) => {
    // ?? SAFETY CHECK: If movies is undefined, null, or not an array, return an empty array
    if (!movies || !Array.isArray(movies)) {
      return [];
    }

    // If the filter is "All", just return the original array
    if (genreFilter === "All") return movies;

    // Otherwise, filter by the selected genre
    return movies.filter(
      (movie) => movie.genre?.toLowerCase().includes(genreFilter.toLowerCase())
    );
  };
  return (
    <div className="App">
      <Navbar setGenreFilter={setGenreFilter}/>
      <Banner  />

      <Row
        title="Trending Now"
        movies={filterMovies(trending).slice(0, 10)}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="Top Rated"
        movies={filterMovies(topRated).slice(0, 10)}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="Action Movies"
        movies={filterMovies(actionMovies).slice(0, 10)}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />
      
    </div>
    
  );
}

// Inside your React component (Home.js)




export default Home;
