import { useMemo } from "react";
import MediaGridPage from "../Components/MediaGridPage";

function TVShows({
  movies,
  watchlist,
  addToWatchlist,
  removeFromWatchlist,
}) {
  const sortedShows = useMemo(() => {
    const tvShows = Array.isArray(movies)
      ? movies.filter(
          (item) =>
            item.seasons ||
            item.tags?.some((tag) => tag.toLowerCase().includes("shows"))
        )
      : [];

    return [...tvShows].sort((a, b) => {
      const trendingA = a.tags?.includes("trending") ? 1 : 0;
      const trendingB = b.tags?.includes("trending") ? 1 : 0;

      if (trendingA !== trendingB) {
        return trendingB - trendingA;
      }

      return Number(b.rating || 0) - Number(a.rating || 0);
    });
  }, [movies]);

  return (
    <MediaGridPage
      title="TV Shows"
      items={sortedShows}
      emptyMessage="No TV shows available right now."
      watchlist={watchlist}
      addToWatchlist={addToWatchlist}
      removeFromWatchlist={removeFromWatchlist}
    />
  );
}

export default TVShows;
