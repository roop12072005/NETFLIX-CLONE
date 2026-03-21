import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [loading, setLoading] = useState(true);


  const [watchlist, setWatchlist] = useState(() => {
  const saved = localStorage.getItem("watchlist");
  return saved ? JSON.parse(saved) : [];
});

  useEffect(() => {
  Promise.all([
    fetch("http://localhost:4000/trending").then((res) => res.json()),
    fetch("http://localhost:4000/topRated").then((res) => res.json()),
    fetch("http://localhost:4000/actionMovies").then((res) => res.json()),
  ]).then(([trendingData, topRatedData, actionData]) => {
    setTrending(trendingData);
    setTopRated(topRatedData);
    setActionMovies(actionData);
    setLoading(false);
  });
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
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/home" 
          element={
          <ProtectedRoute>
            <Home 
              trending={trending}
              topRated={topRated}
              actionMovies={actionMovies}
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
                  trending={trending}
                  topRated={topRated}
                  actionMovies={actionMovies}
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
                  trending={trending}
                  topRated={topRated}
                  actionMovies={actionMovies}
                  addToWatchlist={addToWatchlist}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/genre/:genreName"
            element={
              <ProtectedRoute>
                <GenrePage
                  trending={trending}
                  topRated={topRated}
                  actionMovies={actionMovies}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/collection/:name"
            element={
              <ProtectedRoute>
                <CollectionPage
                  trending={trending}
                  topRated={topRated}
                  actionMovies={actionMovies}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tvshows"
            element={
              <ProtectedRoute>
                <TVShows 
                  trending={trending}
                  topRated={topRated}
                  actionMovies={actionMovies}
                  />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <Movies 
                  trending={trending}
                  topRated={topRated}
                  actionMovies={actionMovies}
                  />
              </ProtectedRoute>
            }
          />
      </Routes>
    </Router>
  );
}

export default App;
