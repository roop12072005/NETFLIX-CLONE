import React from "react";

function Banner() {
    const bannerStyle = {
    backgroundImage: "url('/posters/Banner.jpg')", // No ./ prefix needed for public folder
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
    <div className="banner" style={bannerStyle}>
      <div className="banner_content">
        <h1 className="banner_title" style={titleStyle}>JOHN WICK</h1>

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <p className="banner_description">
          John Wick, played by <u>Keanu Reeves</u>, is a legendary, retired hitman forced back into the criminal underworld he left behind. Known as "Baba Yaga" or the Boogeyman, he is renowned for his sheer will, focus, and relentless pursuit of revenge after gangsters kill the puppy left by his deceased wife. 
        </p>
      </div>
    </div>
  );
}

export default Banner;
