import React from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileButton from "../ProfileButton/ProfileButton";

function Navigation({ isLoggedIn, onSideMenu }) {
  const location = useLocation();

  return (
    <>
      {isLoggedIn ? (
        <div className="navigation">
          <ul className="navigation__container">
            <li>
              <Link to="/signup" className="navigation__signup">Регистрация</Link>
            </li>
            <li>
              <Link to="/signin" className="navigation__signin">Войти</Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className="navigation navigation_active">
          <ul className="navigation__container navigation__container_active">
            <li className="navigation__items">
              <Link to="/movies" className={`navigation__item ${location.pathname === "/movies" ? "navigation__item_active" : ""}`}>Фильмы</Link>
              <Link to="/saved-movies" className={`navigation__item ${location.pathname === "/saved-movies" ? "navigation__item_active" : ""}`}>Сохранённые фильмы</Link>
            </li>
            <li><ProfileButton /></li>
          </ul>
          <button type="button" className="navigation__menu-burger" onClick={onSideMenu}></button>
        </div>
      )
      }
    </>
  );
}

export default Navigation;