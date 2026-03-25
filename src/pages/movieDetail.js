import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./MovieDetails.css";

function MovieDetails({ movies, addToWatchlist, removeFromWatchlist, watchlist }) {
  const location = useLocation();
  const movie = location.state;
  const [showTrailer, setShowTrailer] = useState(false);
  const isInWatchlist = watchlist?.some((item) => item.id === movie?.id);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowTrailer(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  if (!movie) {
    return <h1 style={{ color: "white" }}>Movie not found</h1>;
  }

  return (
    <div className="movie_page">
      <Navbar />

      <div
        className="movie_backdrop"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0) 80%), url(/posters/${encodeURIComponent(movie.poster)})`,
        }}
      ></div>

      <div className="movie_content">
        <div className="movie_poster_card">
          <img
            className="movie_poster"
            src={`/posters/${movie.poster}`}
            alt={movie.title}
          />

          <div className="movie_poster_actions">
            <button className="play_btn" onClick={() => setShowTrailer(true)}>
              Play Trailer
            </button>

            <button
              className="watch_btn"
              onClick={() =>
                isInWatchlist
                  ? removeFromWatchlist(movie)
                  : addToWatchlist(movie)
              }
            >
              {isInWatchlist ? "Added to List" : "+ Add to List"}
            </button>
          </div>
        </div>

        <div className="movie_info">
          <h1>{movie.title}</h1>

          <div className="movie_meta">
            {movie.rating} | {movie.year}
          </div>

          <p className="movie_description">{movie.description}</p>

          {showTrailer && (
            <div className="trailer_overlay">
              <div className="trailer_container">
                <span
                  className="trailer_close"
                  onClick={() => setShowTrailer(false)}
                >
                  X
                </span>

                {movie.trailer.includes("youtube") ? (
                  <iframe
                    width="100%"
                    height="400"
                    src={movie.trailer}
                    title="Trailer"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    width="100%"
                    height="400"
                    controls
                    autoPlay
                    src={`/trailer/${movie.trailer}`}
                  ></video>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
