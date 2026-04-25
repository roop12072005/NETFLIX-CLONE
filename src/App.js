import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Scroll from'./pages/Scroll';
import Home from "./pages/Home";
import Login from "./Login";
import {useEffect, useState} from "react";
import MovieDetail from "./pages/movieDetail.js";
import MyList from "./pages/MyList";
import Search from "./pages/Search";
import GenrePage from './pages/GenrePage';
import CollectionPage from "./pages/Collection.js";
import TVShows from "./pages/TVShows";
import Movies from "./pages/Movies";
import Register from "./Register.js"
import ProtectedRoute from "./ProtectedRoute.js";


function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [currentUser, setCurrentUser] = useState(
  JSON.parse(localStorage.getItem("currentUser"))
);

useEffect(() => {
  const syncUser = () => {
    setCurrentUser(
      JSON.parse(localStorage.getItem("currentUser"))
    );
  };

  window.addEventListener("storage", syncUser);

  syncUser();

  return () => window.removeEventListener("storage", syncUser);
}, []);

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user?.id) return;

  fetch(`http://localhost/streaming_api/wishlist.php?user_id=${user.id}`)
    .then((res) => res.json())
    .then((ids) => {
      const allContent = [...movies, ...tvShows];

      const matchedItems = allContent.filter((item) =>
        ids.includes(item.id)
      );

      setWatchlist(matchedItems);
    });
}, [currentUser, movies, tvShows]);


  useEffect(() => {
    fetch('http://localhost/streaming_api/movies.php')
  .then((res) => res.json())
  .then((data) => {
    setMovies(data);
  });
    }, []); 
  
    useEffect(() => {
          // NEW WAY
    fetch('http://localhost/streaming_api/shows.php')
    .then((res) => res.json())
    .then((data) => {
      setTvShows(data);
    });
    }, []); 


const addToWatchlist = (movie) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if(!user?.id) return;

  fetch("http://localhost/streaming_api/wishlist.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify({
      user_id: user.id,
      content_id: movie.id
    })
    }).then(() => {
      setWatchlist((prev) => {
        const exists = prev.find((items) => items.id === movie.id)
        if(exists) return prev;
        return [ ...prev, movie];
      });
    });
};

const removeFromWatchlist = (movie) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if(!user?.id) return;

  fetch("http://localhost/streaming_api/wishlist.php", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify({
      user_id: user.id,
      content_id: movie.id
    })
  }).then(() => {
    setWatchlist((prev) => prev.filter((item) => item.id !== movie.id));
  });
};

  const [, setIsAuthenticated] = useState(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    return authData?.loggedIn || false;
  });
  
  

  return (
    <Router>
      <Scroll />
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home" 
            element={
            <ProtectedRoute>
              <Home 
                movies={movies}
                tvShows={tvShows}
                watchlist={watchlist}
                addToWatchlist={addToWatchlist}
                removeFromWatchlist={removeFromWatchlist}
                setIsAuthenticated={setIsAuthenticated}
                />
            </ProtectedRoute>
            }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Search
                    movies={movies}
                    tvShows={tvShows}
                    watchlist={watchlist}
                    addToWatchlist={addToWatchlist}
                    removeFromWatchlist={removeFromWatchlist}
                  />
                </ProtectedRoute>
              }
            />
            <Route
            path="/mylist"
            element={
              <ProtectedRoute>
                <MyList
                  watchlist={watchlist}
                  removeFromWatchlist={removeFromWatchlist}
                />
              </ProtectedRoute>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <ProtectedRoute>
                  <MovieDetail
                    addToWatchlist={addToWatchlist}
                    removeFromWatchlist={removeFromWatchlist}
                    watchlist={watchlist}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/genre/:genreName"
              element={
                <ProtectedRoute>
                  <GenrePage
                    movies={movies}
                    watchlist={watchlist}
                    addToWatchlist={addToWatchlist}
                    removeFromWatchlist={removeFromWatchlist}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/collection/:name"
              element={
                <ProtectedRoute>
                  <CollectionPage
                    movies={[...movies, ...tvShows]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tvshows"
              element={
                <ProtectedRoute>
                  <TVShows 
                    movies={movies}
                    tvShows={tvShows}
                    watchlist={watchlist}
                    addToWatchlist={addToWatchlist}
                    removeFromWatchlist={removeFromWatchlist}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute>
                  <Movies 
                    movies={movies}
                    watchlist={watchlist}
                    addToWatchlist={addToWatchlist}
                    removeFromWatchlist={removeFromWatchlist}
                  />
                </ProtectedRoute>
              }
            />
        </Routes>
    </Router>
  );
}

export default App;
