import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./Search.css";

function Search({ trending, topRated, actionMovies }) {

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";

  const allMovies = [...trending, ...topRated, ...actionMovies];

  const results = query ? allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  ) : [];

  return (
    <div className="search_page">
      <Navbar />

      <h1 className="search_title">
        Results for "{query}"
      </h1>

      <div className="search_grid">

        {results.length === 0 ? (
          <p>No movies found</p>
        ) : (
          results.map((movie, index) => (
            <img
              key={index}
              className="search_poster"
              src={`/posters/${movie.poster}`}
              alt={movie.title}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Search;