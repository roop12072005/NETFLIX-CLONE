import React from "react";

function Banner({type , genre }) {

  

  const bannerData = {
    home: {
      title: "JOHN WICK",
      description: "John Wick, played by <u>Keanu Reeves</u>, is a legendary, retired hitman forced back into the criminal underworld he left behind. Known as "+"Baba Yaga"+" or the Boogeyman, he is renowned for his sheer will, focus, and relentless pursuit of revenge after gangsters kill the puppy left by his deceased wife. ",
      image: "/posters/Banner.jpg"
    },
   //src={`/posters/${movie.poster}`}
    Action: {
      title: "Action Movies",
      description: "High adrenaline battles and intense missions.",
      image: "/posters/Banner.jpg"
    },

    "Sci-Fi": {
      title: "Sci-Fi",
      description: "Explore futuristic worlds and technology.",
      image: "/genreBanners/scifi.jpg"
    },

    Drama: {
      title: "Drama",
      description: "Emotional storytelling and powerful characters.",
      image: "/genreBanners/drama.jpg"
    },

    Crime: {
      title: "Crime",
      description: "Dark underworld and thrilling crime stories.",
      image: "/genreBanners/crime.jpg"
    },

    Adventure: {
      title: "Adventure",
      description: "Epic journeys and exploration.",
      image: "/genreBanners/adventure.jpg"
    },

    tv: {
      title: "TV Shows",
      description: "Binge-worthy series and shows.",
      image: "/genreBanners/tv.jpg"
    },

    movie: {
      title: "Movies",
      description: "Explore blockbuster and trending movies.",
      image: "/genreBanners/movie.jpg"
    }
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

  const bannerStyle = {

    backgroundImage: `url(${data.image})`, // No ./ prefix needed for public folder
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '500px', // Ensure height is set or it won't show
    width: '100%',
    marginTop: '60px'
    
  };

  const titleStyle = {

    fontFamily: 'Impact, sans-serif',
    textTransform: 'uppercase',
    fontSize: '5rem',
    color: 'white',
    letterSpacing: '5px'

  };

  return (
    <div 
      className="banner"
       style={bannerStyle}
       >

      <div className="banner_content">

        <h1 
          className="banner_title"
          style={titleStyle}>
            {data.title}
          </h1>

        <div className="banner_buttons">

          <button className="banner_button">Play</button>
          
          <button className="banner_button">My List</button>
        
        </div>

        <p className="banner_description">
          {data.description}
        </p>
      </div>
    </div>
  );
}

export default Banner;
