import Navbar from "../../Components/NavBar/Navbar";
import { useState, useEffect } from "react";
import { useContext } from "react";
import WatchlistContext from "../../context.js/WatchlistContext";
import "./MyList.css";

function MyList() {
  // const [watchlist, setWatchlist] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const { watchlist , removeFromWatchlist, loading, error } = useContext(WatchlistContext);
  


  const handleRemove = async (movie) => {
    try {
      await removeFromWatchlist(movie)
    }catch(err){
      console.log(err);
    }
  }
  if(loading){
    return <h2>loading... </h2>
  }
  if(error){
    return <h2>error... </h2>
  }
  
  return (
    <div className="mylist_page">
      <Navbar />
      <h1 className="mylist_title">My List</h1>

      <div className="mylist_grid">
        {watchlist.length === 0 ? (
          <p>No movies in your list.</p>
        ) : (
          watchlist.map((movie) => (
            <div key={movie.id} className="mylist_card">
              <img
                src={movie.poster}
                alt={movie.title}
              />
              <h2 className="mylist_card_title">{movie.title}</h2>
              <button
                className="remove_button"
                onClick={() => handleRemove(movie)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyList;
