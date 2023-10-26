import { useEffect } from "react";

function useSideMenuClose(isSideMenuOpen, onSideMenuClose) {
  useEffect(() => {
    if (!isSideMenuOpen)

      return;

    const handleOverlay = (e) => {
      if (e.target.classList.contains("menu_opened")) {
        onSideMenuClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onSideMenuClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [isSideMenuOpen, onSideMenuClose]);
}

export default useSideMenuClose;