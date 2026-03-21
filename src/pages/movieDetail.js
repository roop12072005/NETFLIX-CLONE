
import Navbar from "../Components/Navbar";
import { useLocation } from "react-router-dom";
import "./MovieDetails.css";
import { useState } from "react";
import { useEffect } from "react";

function MovieDetails({ addToWatchlist }) {

  const location = useLocation();
  const movie = location.state;
  const [ showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => { 
      if (e.key === "Escape") {
        setShowTrailer(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return() => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  if (!movie) {
    return <h1 style={{ color: "white" }}>Movie not found</h1>;
  }

  return (
    <div className="movie_page">
      <Navbar />

      <div className="movie_backdrop"
        style={{
          backgroundImage: `url(/posters/${movie.poster})`
        }}></div>
        
        <div className="movie_content">
            <img
                className="movie_poster"
                src={`/posters/${movie.poster}`}
                alt={movie.title}
            />

        <div className="movie_info">

          <h1>{movie.title}</h1>

          <div className="movie_meta">
            ⭐ {movie.rating} • {movie.year}
          </div>

           <p className="movie_description">
            {movie.description}
          </p>

          <div className="movie_buttons">
            <button
             className="play_btn"
             onClick={() => setShowTrailer(true)}>
              ▶ Play Trailer
            </button>
        
            <button
             className="watch_btn"
             onClick={() => addToWatchlist(movie)}>
              + My List
            </button>

          </div>
          {showTrailer && (
            <div className="trailer_overlay">

              <div className="trailer_container">

                <span
                  className="trailer_close"
                  onClick={() => setShowTrailer(false)}
                >
                  ✕
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