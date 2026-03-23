import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Use ../ to go up one level out of 'pages', then into 'Components'
import Navbar from '../Components/Navbar'; 


function GenrePage({
  movies,
  watchlist,
  addToWatchlist,
  removeFromWatchlist
}) {


  const { genreName } = useParams();
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  
  

  const genreMovies = movies.filter((movie) =>
    movie.genre?.toLowerCase().includes(genreName?.toLowerCase())
  );


  const genreInfo = {
  Action: {
    title: "ACTION MOVIES",
    description: "High adrenaline battles and intense missions.",
    banner: "/genreBanners/action.jpg"
  },
  "Sci-Fi": {
    title: "SCI-FI",
    description: "Explore futuristic worlds and advanced technology.",
    banner: "/genreBanners/scifi.jpg"
  },
  Drama: {
    title: "DRAMA",
    description: "Powerful emotional storytelling and characters.",
    banner: "/genreBanners/drama.jpg"
  },
  Crime: {
    title: "CRIME",
    description: "Dark underworld stories and criminal masterminds.",
    banner: "/genreBanners/crime.jpg"
  },
  Adventure: {
    title: "ADVENTURE",
    description: "Epic journeys and thrilling explorations.",
    banner: "/genreBanners/adventure.jpg"
  }
};
  const info = genreInfo[genreName] || {
    title: `${genreName?.toUpperCase()} MOVIES`,
    description: "Explore titles in this genre.",
    banner: "/genreBanners/action.jpg"
  };

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
    <div className="genre_page">
      <Navbar />
      <div
        className="genre_banner"
        style={{ backgroundImage: `url(${info.banner})` }}
      >
        <div className="genre_banner_content">

          <h1>{info.title}</h1>

          <p>{info.description}</p>

          <button
            className="genre_play"
            onClick={() => genreMovies[0] && setSelectedMovie(genreMovies[0])}
            disabled={!genreMovies.length}
          >
            Play Featured
          </button>

        </div>
      </div>

      <div className="genre_content">
        <h1 className="genre_title">
          {genreName.toUpperCase()} MOVIES
        </h1>

        <div className="movie_grid">
          {genreMovies.map((movie) => (
            <div
              key={movie.id}
              className="poster_container genre_poster_container"
            >
              <img
                src={`/posters/${movie.poster}`}
                alt={movie.title}
                className="row_poster grid_poster"
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

export default GenrePage;
