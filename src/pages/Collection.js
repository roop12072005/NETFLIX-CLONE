import { useParams } from "react-router-dom";
import Navbar from '../Components/Navbar'; 
import { useState, useEffect } from "react";

function CollectionPage({ movies }) {
  const { name } = useParams();
  const [visibleMovies, setVisibleMovies] = useState(12);

  const collectionConfig = {
    trending: { title: "Trending Now", tags: ["trending", "trending now"] },
    topRated: { title: "Top Rated", tags: ["topRated", "top rated"] },
    "dual audio": { title: "Dual Audio", tags: ["dual audio"] },
  };

  const normalizedName = decodeURIComponent(name || "").trim().toLowerCase();
  const selectedCollection = collectionConfig[name] || collectionConfig[normalizedName];
  const matchingTags = selectedCollection
    ? selectedCollection.tags.map((tag) => tag.toLowerCase())
    : [normalizedName];

  const collectionMovies = Array.isArray(movies)
    ? movies.filter((movie) =>
        movie.tags?.some((tag) => matchingTags.includes(tag.toLowerCase()))
      )
    : [];

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

  useEffect(() => {
    setVisibleMovies(12);
  }, [name]);

  if (!movies || movies.length === 0) {
    return <div style={{ background:"#111", color:"white", padding:"100px" }}>Loading movies...</div>;
  }

  return (
    <div style={{ background:"#111", minHeight:"100vh", color:"white" }}>
      <Navbar />
      <div style={{ padding:"120px 40px" }}>
        <h1>{selectedCollection?.title || decodeURIComponent(name || "")}</h1>

        <div className="movie_grid">
          {collectionMovies.slice(0, visibleMovies).map(movie => (
            <div key={movie.id} className="poster_container genre_poster_container">
              <img
                src={`/posters/${movie.poster}`}
                alt={movie.title}
                className="grid_poster"
              />
              <h2 className="poster_title">{movie.title}</h2>
            </div>
          ))}

          {!collectionMovies.length && (
            <p style={{ textAlign:"center", marginTop:"30px", width:"100%" }}>
              No movies found in this collection.
            </p>
          )}

          {visibleMovies < collectionMovies.length && (
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
