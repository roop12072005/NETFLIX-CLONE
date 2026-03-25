import Navbar from "../Components/Navbar";

import "./MyList.css";

function MyList({ watchlist, removeFromWatchlist }) {
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
                src={`/posters/${movie.poster}`}
                alt={movie.title}
              />
              <h2 className="mylist_card_title">{movie.title}</h2>
              <button
                className="remove_button"
                onClick={() => removeFromWatchlist(movie)}
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
