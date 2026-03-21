import Navbar from "../Components/Navbar";
import Row from "../Components/Row";

function TVShows({ trending, topRated, actionMovies }) {

  // Example filter: only TV shows
  const tvShows = [...trending, ...topRated, ...actionMovies].filter(
    (movie) => movie.type === "tv"
  );

  return (
    <div style={{ background: "#111", minHeight: "100vh", color: "white" }}>
      <Navbar />

      <div style={{ paddingTop: "100px" }}>
        <h1 style={{ marginLeft: "40px" }}>TV Shows</h1>

        <Row title="Popular TV Shows" movies={tvShows} />
      </div>
    </div>
  );
}

export default TVShows;