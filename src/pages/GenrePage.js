import { useParams } from "react-router-dom";
// Use ../ to go up one level out of 'pages', then into 'Components'
import Navbar from '../Components/Navbar'; 
import Row from '../Components/Row';


function GenrePage({ trending, topRated, actionMovies }) {


  const { genreName } = useParams();
  

  const allMovies = [...trending, ...topRated, ...actionMovies];

  const uniqueMovies = Array.from(
    new Map(allMovies.map(movie => [movie.id, movie])).values()
  );

  const genreMovies = uniqueMovies.filter((movie) =>
    movie.genre?.toLowerCase().includes(genreName?.toLowerCase())
  );


  const genreInfo = {
  Action: {
    title: "ACTION MOVIES",
    description: "High adrenaline battles and intense missions.",
    banner: "/genreBanners/action.jpg"
  },
  "Sci-Fi": {
    title: "SCI-FI",
    description: "Explore futuristic worlds and advanced technology.",
    banner: "/genreBanners/scifi.jpg"
  },
  Drama: {
    title: "DRAMA",
    description: "Powerful emotional storytelling and characters.",
    banner: "/genreBanners/drama.jpg"
  },
  Crime: {
    title: "CRIME",
    description: "Dark underworld stories and criminal masterminds.",
    banner: "/genreBanners/crime.jpg"
  },
  Adventure: {
    title: "ADVENTURE",
    description: "Epic journeys and thrilling explorations.",
    banner: "/genreBanners/adventure.jpg"
  }
};
  const info = genreInfo[genreName];

  return (
    <div style={{ background: "#111", minHeight: "100vh", color: "white" }}>
      <Navbar />
        <div
            className="genre_banner"
            style={{ backgroundImage: `url(${info.banner})` }}
            >
            <div className="genre_banner_content">

                <h1>{info.title}</h1>

                <p>{info.description}</p>

                <button className="genre_play">
                ? Play Featured
                </button>

            </div>
        </div>
      <div style={{ padding: "120px 40px" }}>
        <h1 style={{ fontSize: "40px", marginBottom: "40px" }}>
          {genreName.toUpperCase()} MOVIES
        </h1>

        <Row title={`${genreName} Collection`} movies={genreMovies} />
      </div>
    </div>
  );
}

export default GenrePage;
