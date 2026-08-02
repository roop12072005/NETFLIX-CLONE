import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Scroll from "../../Components/scroll/Scroll";
import Home from "../../pages/Home/Home.js";
import Login from "../../pages/Login/Login";
import {useEffect, useState} from "react";
import MovieDetail from "../../pages/Movies/movieDetail.js";
import MyList from "../../pages/Mylist/MyList";
import Search from "../../pages/Search/Search.js";
import GenrePage from '../../Components/GenrePage/GenrePage';
import CollectionPage from "../../Components/Collection/Collection.js";
import TVShows from "../../pages/Shows/TVShows";
import Movies from "../../pages/Movies/Movies";
import Register from "../../pages/Login/Register.js"
import ProtectedRoute from "../../ProtectedRoute.js";
import ShowDetails from "../../pages/Shows/ShowDetails";

function App() {
  // const [popularMovies , setPopularMovies] = useState([])
  // const [topRatedMovies , setTopRatedMovies] = useState([])
  // const [allMovies , setAllMovies] = useState([])

  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState({
    popular :[],
    topRated: [],
    upcoming: [],
    latest: [],
    allMovies: []
  });
  const [tvShows, setTvShows] = useState({
    popular :[],
    topRated: [],
    onTheAir: [],
    airingToday: [],
    allShows: []
  });

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes , showsRes] = await Promise.all([
          fetch("http://localhost:5000/api/movies"),
          fetch("http://localhost:5000/api/tvshows")
        ]);

        if (!moviesRes.ok) {
          throw new Error("Failed to fetch Movies");
        }
        if (!showsRes.ok) {
          throw new Error("Failed to fetch Shows");
        }

        const [moviesData , showsData] = await Promise.all([
          moviesRes.json(),
          showsRes.json()
        ]);
        setMovies(moviesData.movies)
        setTvShows(showsData.shows)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
  console.log("Movies state updated:", movies);
  console.log("shows state updated:", tvShows);
  }, [tvShows , movies]);

          
  const addToWatchlist = (movie) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setWatchlist((prev) => {
      const exits = prev.find((items) => items.id === movie.id)
      if(exits) return prev;
      return [ ...prev, movie];
    })
    // if(!user?.id) return;
    // fetch("", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" }, 
    //   body: JSON.stringify({
    //     user_id: user.id,
    //     content_id: movie.id
    //   })
    // }).then(() => {
    //   setWatchlist((prev) => {
    //     const exists = prev.find((items) => items.id === movie.id)
    //     if(exists) return prev;
    //     return [ ...prev, movie];
    //     });
    //  });
   };
          
const removeFromWatchlist = (movie) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  setWatchlist((prev) => prev.filter((item) => item.id !== movie.id));
  // if(!user?.id) return;

  // fetch("", {
  //   method: "DELETE",
  //   headers: { "Content-Type": "application/json" }, 
  //   body: JSON.stringify({
  //     user_id: user.id,
  //     content_id: movie.id
  //   })
  // }).then(() => {
  //   setWatchlist((prev) => prev.filter((item) => item.id !== movie.id));
  // });
};

const [isAuthenticated, setIsAuthenticated] = useState(true)
if(loading){
  return <h1>Loading.....</h1>
}
  return (
    <Router>
      <Scroll />
        <Routes>
          {/* <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          <Route
            path="/" 
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
           // </ProtectedRoute>
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
                    movies={movies}
                    addToWatchlist={addToWatchlist}
                    removeFromWatchlist={removeFromWatchlist}
                    watchlist={watchlist}
                  />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/movie/:id"
              element={
                <ProtectedRoute>
                  <
                    movies={movies}
                    addToWatchlist={addToWatchlist}
                    removeFromWatchlist={removeFromWatchlist}
                    watchlist={watchlist}
                  />
                </ProtectedRoute>
              }
            /> */}
            <Route
              path="/genre/:genreName"
              element={
                <ProtectedRoute>
                  <GenrePage
                    items={[...movies.allMovies, ...tvShows.allShows]}
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
                    shows={tvShows}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tvshows"
              element={
                <ProtectedRoute>
                  <TVShows 
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
           <Route
              path="/tvshows/:id"
              element={
                <ProtectedRoute>
                  <ShowDetails
                    tvShows={tvShows}
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
