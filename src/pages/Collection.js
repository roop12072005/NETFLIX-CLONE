import { useParams } from "react-router-dom";
import Navbar from '../Components/Navbar'; 
import { useState, useEffect } from "react";

function CollectionPage({ trending, topRated, actionMovies }) {

  const { name } = useParams();
  const [visibleMovies, setVisibleMovies] = useState(12);
  useEffect(() => {

    const handleScroll = () => {

        if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
        ) {
        setVisibleMovies(prev => prev + 8);
        }

    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

    }, []);

  let movies = [];

  if (name === "Trending Now") movies = trending;
  if (name === "Top Rated") movies = topRated;
  if (name === "Action Movies") movies = actionMovies;

  return (
    <div style={{ background:"#111", minHeight:"100vh", color:"white" }}>

      <Navbar />

      <div style={{ padding:"120px 40px" }}>

         <h1>{name}</h1>

        <div className="movie_grid">

          {movies.slice(0, visibleMovies).map(movie => (

            <img
              key={movie.id}
              src={`/posters/${movie.poster}`}
              alt={movie.title}
              className="grid_poster"
            />

          ))}
          
          {visibleMovies < movies.length && (
            <p style={{textAlign:"center", marginTop:"30px"}}>
                Loading more movies...
            </p>
            )}
        </div>

      </div>

    </div>
  );
}

export default CollectionPage;