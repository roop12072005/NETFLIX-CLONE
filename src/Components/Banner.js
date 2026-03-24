import React from "react";
import { useNavigate } from "react-router-dom";

function Banner({
  type,
  genre,
  featuredMovie,
  watchlist,
  addToWatchlist,
  removeFromWatchlist,
}) {
  const navigate = useNavigate();

  const bannerData = {
    home: featuredMovie
      ? {
          title: featuredMovie.title,
          description: featuredMovie.description,
          image: `/posters/${featuredMovie.poster}`,
          meta: `${featuredMovie.year} • ${featuredMovie.genre}`,
        }
      : {
          title: "JOHN WICK",
          description:
            "A legendary retired hitman is forced back into the underworld he left behind.",
          image: "/posters/Banner.jpg",
          meta: "Action Thriller",
        },
    Action: {
      title: "Action Movies",
      description: "High adrenaline battles and intense missions.",
      image: "/posters/Banner.jpg",
    },
    "Sci-Fi": {
      title: "Sci-Fi",
      description: "Explore futuristic worlds and technology.",
      image: "/genreBanners/scifi.jpg",
    },
    Drama: {
      title: "Drama",
      description: "Emotional storytelling and powerful characters.",
      image: "/genreBanners/drama.jpg",
    },
    Crime: {
      title: "Crime",
      description: "Dark underworld and thrilling crime stories.",
      image: "/genreBanners/crime.jpg",
    },
    Adventure: {
      title: "Adventure",
      description: "Epic journeys and exploration.",
      image: "/genreBanners/adventure.jpg",
    },
    tv: {
      title: "TV Shows",
      description: "Binge-worthy series and shows.",
      image: "/genreBanners/tv.jpg",
    },
    movie: {
      title: "Movies",
      description: "Explore blockbuster and trending movies.",
      image: "/genreBanners/movie.jpg",
    },
  };

  let data;

  if (type === "genre") {
    data = bannerData[genre];
  } else if (type === "tv") {
    data = bannerData.tv;
  } else if (type === "movie") {
    data = bannerData.movie;
  } else {
    data = bannerData.home;
  }

  const isHomeBanner = !type || type === "home";
  const isInWatchlist = watchlist?.some((item) => item.id === featuredMovie?.id);

  const handlePlay = () => {
    if (!featuredMovie) return;
    navigate(`/movie/${featuredMovie.id}`, { state: featuredMovie });
  };

  const handleWatchlistToggle = () => {
    if (!featuredMovie) return;

    if (isInWatchlist) {
      removeFromWatchlist(featuredMovie);
      return;
    }

    addToWatchlist(featuredMovie);
  };

  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${data.image})` }}
    >
      <div className="banner_overlay">
        <div className="banner_content">
          {data.meta && <p className="banner_meta">{data.meta}</p>}

          <h1 className="banner_title">{data.title}</h1>

          {isHomeBanner && featuredMovie && (
            <div className="banner_buttons">
              <button className="banner_button banner_button_primary" onClick={handlePlay}>
                Play
              </button>

              <button
                className="banner_button banner_button_secondary"
                onClick={handleWatchlistToggle}
              >
                {isInWatchlist ? "Remove from My List" : "+ My List"}
              </button>
            </div>
          )}

          <p className="banner_description">{data.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
