import React from "react";
import { useNavigate } from "react-router-dom";

function Banner({
  featuredMovie,
  watchlist,
  addToWatchlist,
  removeFromWatchlist,
}) {
  const navigate = useNavigate();


  // const movieBannerData = featuredMovie 
  // const bannerData = [
  //   {
  //   home: movieBannerData[0]
  //     ,
  //   Action: movieBannerData[1] || {
  //     title: "Action Movies",
  //     description: "High adrenaline battles and intense missions.",
  //     image: "/posters/The Dune 2.webp",
  //   },
  //   SciFi: movieBannerData[2] || {
  //     title: "Sci-Fi",
  //     description: "Explore futuristic worlds and technology.",
  //     image: "/genreBanners/scifi.jpg",
  //   },
  //   Drama: movieBannerData[3] || {
  //     title: "Drama",
  //     description: "Emotional storytelling and powerful characters.",
  //     image: "/genreBanners/drama.jpg",
  //   },
  //   Crime: movieBannerData[2] || {
  //     title: "Crime",
  //     description: "Dark underworld and thrilling crime stories.",
  //     image: "/genreBanners/crime.jpg",
  //   },
  //   Adventure: movieBannerData[2] || {
  //     title: "Adventure",
  //     description: "Epic journeys and exploration.",
  //     image: "/genreBanners/adventure.jpg",
  //   },
  //   tv: movieBannerData[2] || {
  //     title: "TV Shows",
  //     description: "Binge-worthy series and shows.",
  //     image: "/genreBanners/tv.jpg",
  //   },
  //   movie: movieBannerData[2] || {
  //     title: "Movies",
  //     description: "Explore blockbuster and trending movies.",
  //     image: "/genreBanners/movie.jpg",
  //   },
  //   }];
  // console.log(bannerData)

  // if (type === "genre") {
  //   data =
  //     movieBannerData || {
  //       title: `${genre || "Genre"} Movies`,
  //       description: "Explore titles in this genre.",
  //       image: "/genreBanners/action.jpg",
  //     };
  // } else if (type === "tv") {
  //   data = bannerData.tv;
  // } else if (type === "movie") {
  //   data = bannerData.movie;
  // } else {
  //   data = bannerData.home;
  // }

  const showActionButtons = Boolean(featuredMovie);
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
      style={{ backgroundImage: `url(${featuredMovie.backdrop})`, minHeight: "10vh" }}
    >
      <div className="banner_overlay">
        <div className="banner_content">
          {featuredMovie.meta && <p className="banner_meta">{featuredMovie.meta}</p>}

          <h1 className="banner_title">{featuredMovie.title}</h1>

          {showActionButtons && (
            <div className="banner_buttons">
              <button
                className="banner_button banner_button_primary"
                onClick={handlePlay}
              >
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

          <p className="banner_description">{featuredMovie.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
