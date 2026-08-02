import MediaGridPage from "../../Components/Grid/MediaGridPage";

function TVShows({
  tvShows,
  watchlist,
  addToWatchlist,
  removeFromWatchlist,
}) {





  // const sortedShows = useMemo(() => {
  //   const allShows = Array.isArray(tvShows)
  //     ? tvShows
  //     : Array.isArray(tvShows)
  //     ? tvShows.filter(
  //         (item) =>
  //           item.seasons ||
  //           item.tags?.some((tag) => tag.toLowerCase().includes("shows"))
  //       )
  //     : [];
      
  //     return [...allShows].sort((a, b) => {
  //       const trendingA = a.tags?.includes("trending") ? 1 : 0;
  //       const trendingB = b.tags?.includes("trending") ? 1 : 0;
        
  //       if (trendingA !== trendingB) {
  //         return trendingB - trendingA;
  //       }
        
  //       return Number(b.rating || 0) - Number(a.rating || 0);
  //     });
  //   }, [tvShows]);
  //   console.log("All shows:", allShows);
  //   console.log(tvShows)
  //   console.log("TV Shows prop:", sortedShows);
    return (
    <MediaGridPage
    title="TV Shows"
    items={tvShows.allShows}
      emptyMessage="No TV shows available right now."
      watchlist={watchlist}
      renderCardActions={({ item, isInWatchlist, openDetails }) => (
        <>
          <button
            className="preview_play"
            onClick={(e) => {
              e.stopPropagation();
              openDetails();
            }}
          >
            Play
          </button>

          <button
            className="preview_watchlist"
            onClick={(e) => {
              e.stopPropagation();

              if (isInWatchlist) {
                removeFromWatchlist(item);
                return;
              }

              addToWatchlist(item);
            }}
          >
            {isInWatchlist ? "Added to List" : "+ My List"}
          </button>
        </>
      )}
    />
  );
}

export default TVShows;
