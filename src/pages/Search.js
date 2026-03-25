import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./Search.css";

function Search({ movies, watchlist, addToWatchlist, removeFromWatchlist }) {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const results = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  const closeModal = () => {
    setSelectedMovie(null);
    setShowTrailer(false);
  };

  const isInWatchlist = watchlist?.some(
    (item) => item.id === selectedMovie?.id
  );

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedMovie]);

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
          results.map((movie) => (
            <div
              key={movie.id}
              className="poster_container search_poster_container"
            >
              <div className="poster_frame">
                <img
                  className="search_poster"
                  src={`/posters/${movie.poster}`}
                  alt={movie.title}
                  onClick={() => navigate(`/movie/${movie.id}`, { state: movie })}
                />

                <div className="poster_overlay">
                  <button
                    className="preview_play"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMovie(movie);
                    }}
                  >
                    Play
                  </button>

                  <button
                    className="preview_watchlist"
                    onClick={(e) => {
                      e.stopPropagation();
                      watchlist?.some((item) => item.id === movie.id)
                        ? removeFromWatchlist(movie)
                        : addToWatchlist(movie);
                    }}
                  >
                    {watchlist?.some((item) => item.id === movie.id)
                      ? "Added to List"
                      : "+ My List"}
                  </button>
                </div>
              </div>

              <h2 className="search_card_title">{movie.title}</h2>
            </div>
          ))
        )}
      </div>

      {selectedMovie && (
        <div className="cinema_overlay" onClick={closeModal}>
          <div
            className="cinema_container"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="cinema_close"
              onClick={closeModal}
            >
              x
            </span>

            {!showTrailer ? (
              <div className="cinema_content">
                <img
                  className="cinema_poster"
                  src={`/posters/${selectedMovie.poster}`}
                  alt={selectedMovie.title}
                />

                <div className="cinema_details">
                  <h2>{selectedMovie.title}</h2>
                  <p className="cinema_year">{selectedMovie.year}</p>
                  <p className="cinema_description">
                    {selectedMovie.description}
                  </p>
                  <span className="rating_badge">
                    {selectedMovie.rating}
                  </span>

                  <div className="cinema_buttons">
                    <button
                      className="cinema_trailer"
                      onClick={() => setShowTrailer(true)}
                    >
                      Play Trailer
                    </button>
                    <button
                      className="watchlist_button"
                      onClick={() =>
                        isInWatchlist
                          ? removeFromWatchlist(selectedMovie)
                          : addToWatchlist(selectedMovie)
                      }
                    >
                      {isInWatchlist ? "Added to List" : "+ Add to Watchlist"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="cinema_section">
                {selectedMovie.trailer.includes("youtube") ? (
                  <iframe
                    width="100%"
                    height="400"
                    src={selectedMovie.trailer}
                    title="Trailer"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    width="100%"
                    height="400"
                    controls
                    autoPlay
                    src={`/trailer/${selectedMovie.trailer}`}
                  ></video>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
