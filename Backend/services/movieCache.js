let movieCache= null;
let tvCache = null ;

module.exports = {

    getMovieCache: () => movieCache,

    setMovieCache: (cache) =>
        {
            movieCache = cache;
        } ,
    
        getTvCache: () => tvCache,
        
        setTvCache: (cache) =>{
            tvCache = cache;
        }
    
};