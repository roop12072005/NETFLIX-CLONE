

import { useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect , useRef } from "react";
import { useLocation } from "react-router-dom";



function Navbar({ setGenreFilter}) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  }

  const location = useLocation();
  
  const [ search, setSearch ] = useState("");

  useEffect(() => {
    const parms = new URLSearchParams(location.search);
    const query = parms.get("q") || "";
    setSearch(query);
  }, [location.search])

  useEffect(() => {
    const delay = setTimeout(() => {

      if (search.trim().length >= 2) {
        navigate(`/search?q=${search}`);
      }

    }, 400); // 400ms delay

    return () => clearTimeout(delay);

  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if(location.pathname === "/search"){
      inputRef.current?.focus();
    }
  }, [location]);

  return (
    <div className="navbar">

      <div className="navbar_left">

        <h2 className="logo">GOMOVIE</h2>

        <div className="navbar_menu">
          
          <NavLink className="nav_item" to="/home">Home</NavLink>
          
          <NavLink className="nav_item" to="/tvShows">TV Shows</NavLink>

          <NavLink className="nav_item" to="/movies">Movies</NavLink>
          
          <NavLink className="nav_item" to="/mylist">My List</NavLink>

        </div>

      </div>
     
      <div className="genre_menu">

        <NavLink  className="nav_item" to="/genre/Action">Action</NavLink>

        <NavLink  className="nav_item" to="/genre/Sci-Fi">Sci-Fi</NavLink>

        <NavLink  className="nav_item" to="/genre/Drama">Drama</NavLink>

        <NavLink  className="nav_item" to="/genre/Crime">Crime</NavLink>

        <NavLink  className="nav_item" to="/genre/Adventure">Adventure</NavLink>

      </div>
        
      <div className="navbar_right">

        <input
          ref={inputRef}
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={handleSearch}
          className="search_input"
        />

        <button className="logout_btn" onClick={handleLogout}>LogOut</button>
      
      </div>
    </div>);
}


export default Navbar;
