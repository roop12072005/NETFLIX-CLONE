import { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../../Components/NavBar/Navbar";
import "./MovieDetails.css";
import WatchlistContext from "../../context.js/WatchlistContext";

function MovieDetails({ movies}) {
  const { id } = useParams();
  const { watchlist, addToWatchlist, removeFromWatchlist } = useContext(WatchlistContext);
  const location = useLocation();
  const movie = location.state ?? movies.allMovies.find((m) => String(m.id) === id);
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
      {/* <link 
      rel="preload" 
      as="image" 
      href={movie.backdrop} 
      fetchpriority="high" 
    /> */}

      <div
        className="movie_backdrop"
        // style={{
        //   backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0) 80%),  url(${movie.backdrop})`,
        // }} 
      >
      <img
        src={movie.backdrop}
        alt={movie.title} 
        fetchPriority="high"
        loading="eager" 
      />
      <div className="movie_backdrop_overlay"></div>
      </div>

      <div className="movie_content">
        <div className="movie_poster_card">
          <img
            className="movie_poster"
            src={movie.poster}
            alt={movie.title}
          />
        </div>

        <div className="movie_info">
          <h1>{movie.title}</h1>

          <div className="movie_genres">
            {movie.genres.map((genre, index) => (
              <span key={index} className="movie_genre">
                {genre}
              </span>
            ))}
          </div>
          <div className="movie_meta">
            TMBD rating {movie.rating} | Released {movie.year}
          </div>

          <p className="movie_description">{movie.description}</p>

          <div className="movie_actions">
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
        

          {showTrailer && (
            <div className="trailer_overlay">
              <div className="trailer_container">
                <span
                  className="trailer_close"
                  onClick={() => setShowTrailer(false)}
                >
                  X
                </span>

                {typeof movie.trailer === "string" && movie.trailer.includes("youtube") ? (
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
