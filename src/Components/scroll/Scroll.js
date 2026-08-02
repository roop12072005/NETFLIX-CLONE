import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Scroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    // This scrolls the window to the very top whenever the URL path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}