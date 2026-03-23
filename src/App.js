import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Scroll from'./pages/Scroll';
import Home from "./pages/Home";
import Login from "./Login";
import { useEffect, useState} from "react";
import MovieDetail from "./pages/movieDetail.js";
import { Navigate } from "react-router-dom";
import MyList from "./pages/MyList";
import Search from "./pages/Search";
import GenrePage from './pages/GenrePage';
import CollectionPage from "./pages/Collection.js";
import TVShows from "./pages/TVShows";
import Movies from "./pages/Movies";

function App() {

  const [loading, setLoading] = useState(true);


  const [watchlist, setWatchlist] = useState(() => {
  const saved = localStorage.getItem("watchlist");
  return saved ? JSON.parse(saved) : [];
});

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/movies").then(res => res.json()).then(data => setMovies(data));
    }, []);  

useEffect(() => {
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}, [watchlist]);

const addToWatchlist = (movie) => {
  setWatchlist((prev) => {
    const exists = prev.find((item) => item.id === movie.id);
    if (exists) return prev;
    return [...prev, movie];
  });
};

const removeFromWatchlist = (movie) => {
  setWatchlist((prev) =>
    prev.filter((item) => item.id !== movie.id)
  );
};

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("auth") === "true";
  });
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" />;
  };

  

  return (
    <Router>
      <Scroll />
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path="/home" 
            element={
            <ProtectedRoute>
              <Home 
                movies={movies}
                loading={loading}
                watchlist={watchlist}
                addToWatchlist={addToWatchlist}
                removeFromWatchlist={removeFromWatchlist}/>
            </ProtectedRoute>
            }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Search
                    movies={movies}
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
                    movies={movies}
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
                    movies={movies}
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
                    />
                </ProtectedRoute>
              }
            />
        </Routes>
    </Router>
  );
}

export default App;
