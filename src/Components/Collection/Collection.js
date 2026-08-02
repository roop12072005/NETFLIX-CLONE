import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Navbar from '../NavBar/Navbar'; 
import { useState, useEffect } from "react";

function CollectionPage({ movies , shows}) {
  const { name } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [visibleMovies, setVisibleMovies] = useState(12);
  const collectionConfig = {
    popular: { title: "Popular" },
    topRated: { title: "Top Rated" },
    upcoming: { title: "Upcoming" },
    "dual audio": { title: "Dual Audio" },
    airingToday: { title: "Airing Today" },
    onTheAir: { title: "On The Air" },
  };
  const normalizedName = decodeURIComponent(name || "").trim();
  const mediaType = searchParams.get("type") === "show" ? "show" : "movie";
  const source = mediaType === "show" ? shows : movies;
  const sourceKey =  normalizedName;
  const collectionItems = Array.isArray(source?.[sourceKey])
    ? source[sourceKey]
    : [];
  const selectedCollection = collectionConfig[normalizedName] ||
    collectionConfig[normalizedName.toLowerCase()];
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

  if (!source || Object.keys(source).length === 0) {
    return <div style={{ background:"#111", color:"white", padding:"100px" }}>Loading...</div>;
  }

  return (
    <div style={{ background:"#111", minHeight:"100vh", color:"white" }}>
      <Navbar />
      <div style={{ padding:"120px 40px" }}>
        <h1>{selectedCollection?.title || normalizedName} {mediaType === "show" ? "Shows" : "Movies"}</h1>

        <div className="movie_grid">
          {collectionItems.slice(0, visibleMovies).map(collectionMovie => (
            <div 
              key={collectionMovie.id} 
              className="poster_container genre_poster_container"
              onClick= {() => 
                collectionMovie.show? navigate(`/tvshows/${collectionMovie.id}`, {collectionMovie: collectionMovie})
                : navigate(`/movie/${collectionMovie.id}`,{ collectionMovie : collectionMovie})
              }
              >
              <img
                src={collectionMovie.poster}
                alt={collectionMovie.title}
                className="grid_poster"
              />
              <h2 className="poster_title">{collectionMovie.title}</h2>
            </div>
          ))}

          {!collectionItems.length && (
            <p style={{ textAlign:"center", marginTop:"30px", width:"100%" }}>
              No movies found in this collection.
            </p>
          )}

          {visibleMovies < collectionItems.length && (
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
