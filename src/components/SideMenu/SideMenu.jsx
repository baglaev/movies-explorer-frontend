import React from "react";
import { Link, useLocation } from "react-router-dom";
import useSideMenuClose from "../../utils/hooks/useSideMenuClose";
import ProfileButton from "../ProfileButton/ProfileButton";

function SideMenu({ isSideMenuOpen, onSideMenuClose }) {
  const location = useLocation();
  useSideMenuClose(isSideMenuOpen, onSideMenuClose)
  return (
    <section className={`menu ${isSideMenuOpen ? "menu_opened" : ""}`}>
      <div className={`menu__container ${isSideMenuOpen ? "menu__container-overlay" : ""}`}>
        <button
          className="menu__button-close"
          type="button"
          onClick={onSideMenuClose}
        />
        <div className="menu__navigation">
          <ul className="menu__items">
            <li>
              <Link to="/" className={`menu__link ${location.pathname === "/" ? "menu__link_active" : ""}`}>Главная</Link>
            </li>
            <li>
              <Link to="/movies" className={`menu__link ${location.pathname === "/movies" ? "menu__link_active" : ""}`}>Фильмы</Link>
            </li>
            <li>
              <Link to="/saved-movies" className={`menu__link ${location.pathname === "/saved-movies" ? "menu__link_active" : ""}`}>Сохраненные фильмы</Link>
            </li>
          </ul>
        </div>
        <ProfileButton />
      </div>
    </section>
  );
}

export default SideMenu;