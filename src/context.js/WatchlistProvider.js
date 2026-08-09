import WatchlistContext from "./WatchlistContext";
import { getWatchlist, addMovie, removeMovie } from "../api/watchlistApi";
import { useEffect , useState } from "react";

function WatchlistProvider({ children}){
    
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const loadWatchlist = async () => {
        setLoading(true)
        try { 
    
            const response = await getWatchlist();
        
            setWatchlist(response.data.watchlist);
        }catch{
            setError("not getting response")
        }finally {
            setLoading(false)
        }
    };
    
    const addToWatchlist = async(movie)=>{
        setLoading(true)
        try{
            
            await addMovie(
                movie.id,
                movie.show ? "tv" : "movie"
            );
        
            await loadWatchlist();
        }catch{
            setError("not movie added response")
        }finally {
            setLoading(false)
        }
    
    };
    
    const removeFromWatchlist = async(movie)=>{
        try{
            await removeMovie(
                movie.id,
                movie.show ? "tv" : "movie"
            );
        
            await loadWatchlist();
    
        }catch{
            setError("not movie removed response")
        }finally {
            setLoading(false)
        }
    
    };
    
    useEffect(()=>{
    
        loadWatchlist();
    
    },[]);

    return (
        <WatchlistContext.Provider value={{ watchlist, loading, error, addToWatchlist, removeFromWatchlist, loadWatchlist}}>
            {children}
            </WatchlistContext.Provider>
    );

}
export default WatchlistProvider;