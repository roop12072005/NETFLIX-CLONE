import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import WatchlistContext from "../../context.js/WatchlistContext";


function Row({ title,shows, movies, tag }) {
  const rowRef = useRef();
  const navigate = useNavigate();
    const { watchlist, addToWatchlist, removeFromWatchlist } = useContext(WatchlistContext);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const scrollLeft = () => {
    rowRef.current.scrollLeft -= 300;
  };
  useEffect(() => {
    if(movies?.length === 0 || shows?.length === 0){
      console.log("Row not received movies:", movies);
      console.log("Row not received shows:", shows);
    }
}, [movies,shows]);
  const scrollRight = () => {
    rowRef.current.scrollLeft += 300;
  };
  const items = shows?.length ? shows : movies;
  const preloadedImages = new Set();

  const preloadMovieImages = (item) =>{
    if(preloadedImages.has(item.id)){
      console.log("already loaded")
      return;
    }

    const backdrop = new Image();
    backdrop.onload =() => {
      preloadedImages.add(item.id);
      console.log(" perloaded backdrop for " , item.title);
    }
    backdrop.onerror = () => {
      console.log("failed to preload the backdrop for ", item.title);
    }

    backdrop.src = item.backdrop;
  };
// {items && items.length > 0 &&
//   items.map((movie) => (
//     ...
//   ))
// }
 if(items?.length === 0){
  console.log("item is empty")
 }
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
          onClick={() =>
            navigate(`/collection/${encodeURIComponent(tag)}?type=${shows !== undefined ? "show" : "movie"}`)
          }
        >
          See More -
        </button>
      </div>

      <div className="row_container">
        <button className="scroll_button left" onClick={scrollLeft}>
          {"<"}
        </button>

        <div className="row_posters" ref={rowRef}>
          {items && items.length > 1 && 
            items.map((item) => (
              <div key={item.id} className="poster_container">
                <div
                 className="poster_frame"
                 onMouseEnter={() => preloadMovieImages(item)}
                 onClick={() =>
                      item.show
                        ? navigate(`/tvshows/${item.id}`, { item: item })
                        : navigate(`/movie/${item.id}`, { item: item })
                    }
                    >
                  <img
                    className="row_poster"
                    src={item.poster}
                    alt={item.title}
                    loading="lazy"
                  />

                  <div className="poster_overlay">
                    <button
                      className="preview_play"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMovie(item);
                      }}
                    >
                      Play
                    </button>

                    <button
                      className="preview_watchlist"
                      onClick={(e) => {
                        e.stopPropagation();
                        const isAlreadyAdded = watchlist?.some(
                          (watchlistItem) => watchlistItem.id === item.id
                        );
                        console.log("whichlist clicked")
                        if (isAlreadyAdded) {
                          removeFromWatchlist(item);
                        } else {
                          addToWatchlist(item);
                        }
                      }}
                    >
                      {watchlist?.some((watchlistItem) => watchlistItem.id === item.id)
                        ? "Added to List"
                        : "+ My List"}
                    </button>
                  </div>
                </div>

                <h3 className="poster_title">{item.title}</h3>
              </div>
            ))}
        </div>

        <button className="scroll_button right" onClick={scrollRight}>
          {">"}
        </button>
      </div>

      {selectedMovie && (
        <div className="cinema_overlay" onClick={closeModal}>
          <div
            className="cinema_container"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="cinema_close" onClick={closeModal}>
              X
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
                  <span className="rating_badge">{selectedMovie.rating}</span>

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

export default Row;
