
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Row({ title, movies, addToWatchlist, removeFromWatchlist, watchlist }) {
  const rowRef = useRef();
  const navigate = useNavigate();

  const scrollLeft = () => {
    rowRef.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    rowRef.current.scrollLeft += 300;
  };
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
 
  const closeModal = () => {
    setSelectedMovie(null);
    setShowTrailer(false);  
  }

  const isInWatchlist = watchlist?.some(
    (item) => item.id === selectedMovie?.id 
     );

//esc sequence
  useEffect(() => {
  const handleEsc = (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  window.addEventListener("keydown", handleEsc);

  return () => {
    window.removeEventListener("keydown", handleEsc);
  };
}, [selectedMovie]);

  return (
    <div className="row">
      <div className="row_header">

        <h2>{title}</h2>

        <button
          className="see_more"
          onClick={() => navigate(`/collection/${title}`)}
        >
          See More →
        </button>

      </div>

      <div className="row_container">
        <button className="scroll_button left" onClick={scrollLeft}>
          ◀
        </button>

        <div className="row_posters" ref={rowRef}>
          {movies && movies.map((movie) => (
            <div
              key={movie.id}
              className="poster_container"
    
            >
              <img
                className="row_poster"
                src={`/posters/${movie.poster}`}
                alt={movie.title}
                onClick={() =>
                navigate(`/movie/${movie.id}`, { state: movie })
                }
              />

              <div className="poster_overlay">

                <button 
                  className="preview_play"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMovie(movie);
                  }}
                >
                  ▶ Play
                </button>

                <button 
                  className="preview_watchlist"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWatchlist(movie);
                  }}
                >
                  {watchlist?.some((item) => item.id === movie.id)
                    ? "Added to List"
                    : "+ My List"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="scroll_button right" onClick={scrollRight}>
          ▶
        </button>
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
          ✕
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
              ⭐{selectedMovie.rating}
            </span>
            
            <div className="cinema_buttons">
              <button
               className ="cinema_trailer"
               onClick={() => setShowTrailer(true)}
              >
                 ▶ Play Trailer
              </button>
              <button
                className="watchlist_button"
                onClick={() => isInWatchlist ? removeFromWatchlist(selectedMovie) : addToWatchlist(selectedMovie)
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

export default Row;
