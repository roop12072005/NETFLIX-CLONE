import { useState , useContext} from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../../Components/NavBar/Navbar";
import "./ShowDetails.css";
import WatchlistContext from "../../context.js/WatchlistContext";

function ShowDetails({ tvShows }) {
  const { id } = useParams();
  const location = useLocation();
  const show = location.state ?? tvShows.allShows.find((s) => String(s.id) === id);
  const seasonCount = Number(show?.seasons) || 0;
  const { watchlist, addToWatchlist, removeFromWatchlist } = useContext(WatchlistContext);

  const [season, setSeason] = useState(1);
  const [episodes] = useState([]);
  const [ showTrailer, setShowTrailer ] = useState(false);

  // useEffect(() => {
  //   if (!show) return;

  //   fetch(
  //     `http://localhost/streaming_api/episodes.php?show_id=${show.id}&season=${season}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => setEpisodes(data));
  // }, [season, show?.id]);

  const isInWatchlist = watchlist.some((item) => item.id === show.id);
  const [currentEpisode, setCurrentEpisode] = useState(null);
 
  const closePlayer = () => {
  setCurrentEpisode(null);
};
if(!show){
  return <h1> Shows Not available</h1>
}

    return (
<div className="show_page">
  <Navbar />

  <div
    className="show_backdrop"
    style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0) 80%),  url(${show.backdrop})`,
        }}
  ></div>

  <div className="show_content">

    <img
      className="show_poster"
      src={show.poster}
      alt={show.title}
    />

    <div className="show_info">
      <h1>{show.title}</h1>

      <div className="show_genres">
          {show.genres.join(", ")}
      </div>
      <div className="show_meta">
          ⭐ {show.rating} | {show.year}
          {seasonCount ? ` | ${seasonCount} Seasons` : ""}
      </div>

      <p className="show_desc">{show.description}</p>

      <button className="show_btn play_btn" onClick={() => setShowTrailer(true)}>
        Play Trailer
      </button>

      <button
        className="show_btn list_btn"
        onClick={() =>
          isInWatchlist
            ? removeFromWatchlist(show)
            : addToWatchlist(show)
        }
      >
        {isInWatchlist ? "Added to List" : "+ My List"}
      </button>

      <br />

      {seasonCount > 0 && (
        <select
          className="season_select"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          {[...Array(seasonCount)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Season {i + 1}
            </option>
          ))}
        </select>
      )}
      
      {showTrailer && (
        <div className="episode_overlay">

          <div className="episode_player">

            <span
              className="close_player"
              onClick={() => setShowTrailer(false)}
            >
              ✕
            </span>

            <video
              width="100%"
              height="500"
              controls
              autoPlay
              src={`/trailer/${show.trailer}`}
            ></video>

            <h2>{show.title} Trailer</h2>

          </div>

        </div>
      )}
      <div className="episodes">
        {episodes.map((ep) => (
        <div key={ep.id} className="ep_card">

          <div className="ep_top">

            <div>
              <h3>
                {ep.episode_number}. {ep.title}
              </h3>

              <p className="ep_time">
                {ep.duration}
              </p>
            </div>

            <button
              className="episode_play_btn"
              onClick={() => setCurrentEpisode(ep)}
            >
              ▶ Play Episode
            </button>

          </div>

          <p>{ep.description}</p>

        </div>
        ))}
      </div>

    </div>
  </div>
  {currentEpisode && (
  <div className="episode_overlay">

    <div className="episode_player">

      <span
        className="close_player"
        onClick={closePlayer}
      >
        ✕
      </span>
      
      <video
        width="100%"
        height="500"
        controls
        autoPlay
        onError={(e) => console.log("VIDEO ERROR", e)}
        src={`/trailer/${currentEpisode.ep_trailer}`}
      ></video>

      <h2>
        {currentEpisode.episode_number}. {currentEpisode.title}
      </h2>

    </div>

  </div>
)}
</div>
);
}

export default ShowDetails;