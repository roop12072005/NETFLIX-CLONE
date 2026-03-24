import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../pages/MediaGridPage.css";

const INITIAL_BATCH = 12;
const SCROLL_BATCH = 6;
const BUTTON_BATCH = 12;

function MediaGridPage({
  title,
  items,
  emptyMessage,
  watchlist,
  addToWatchlist,
  removeFromWatchlist,
}) {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const [canAutoLoad, setCanAutoLoad] = useState(true);
  const [showMoreButton, setShowMoreButton] = useState(false);

  useEffect(() => {
    setVisibleCount(INITIAL_BATCH);
    setCanAutoLoad(true);
    setShowMoreButton(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [title, items]);

  useEffect(() => {
    const handleScroll = () => {
      const hasMoreItems = visibleCount < items.length;
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 140;

      if (!hasMoreItems || !canAutoLoad || !nearBottom) {
        return;
      }

      setVisibleCount((prev) => Math.min(prev + SCROLL_BATCH, items.length));
      setCanAutoLoad(false);
      setShowMoreButton(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [canAutoLoad, items.length, visibleCount]);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + BUTTON_BATCH, items.length));
    setCanAutoLoad(true);
    setShowMoreButton(false);
  };

  const visibleItems = items.slice(0, visibleCount);
  const hasMoreItems = visibleCount < items.length;

  return (
    <div className="media_page">
      <Navbar />

      <div className="media_page_content">
        <div className="media_page_header">
          <h1 className="media_page_title">{title}</h1>
          <p className="media_page_subtitle">
            {items.length} titles available
          </p>
        </div>

        {!items.length ? (
          <p className="media_page_empty">{emptyMessage}</p>
        ) : (
          <>
            <div className="media_grid">
              {visibleItems.map((item) => {
                const isInWatchlist = watchlist?.some(
                  (watchlistItem) => watchlistItem.id === item.id
                );
                const meta = item.seasons
                  ? `${item.year} | ${item.genre} | ${item.seasons} Seasons`
                  : `${item.year} | ${item.genre}`;

                return (
                  <div
                    key={item.id}
                    className="media_card poster_container genre_poster_container"
                  >
                    <img
                      src={`/posters/${item.poster}`}
                      alt={item.title}
                      className="row_poster grid_poster media_grid_poster"
                      onClick={() => navigate(`/movie/${item.id}`, { state: item })}
                    />

                    <div className="poster_overlay">
                      <button
                        className="preview_play"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/movie/${item.id}`, { state: item });
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
                    </div>

                    <div className="media_card_details">
                      <h2 className="media_card_title">{item.title}</h2>
                      <p className="media_card_meta">{meta}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {hasMoreItems && showMoreButton && (
              <div className="media_page_actions">
                <button className="media_show_more" onClick={handleShowMore}>
                  Show More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MediaGridPage;
