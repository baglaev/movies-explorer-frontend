import React from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileButton from "../ProfileButton/ProfileButton";

function Navigation({ isLoggedIn, onSideMenu }) {
  const location = useLocation();

  return (
    <>
      {!isLoggedIn && location.pathname === "/" ? (
        <nav className="nav">
          <ul className="nav__container">
            <li>
              <Link to="/signup" className="nav__signup">
                Регистрация
              </Link>
            </li>
            <li>
              <Link to="/signin" className="nav__signin">
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="nav nav_active">
          <ul className="nav__container nav__container_active">
            <li className="nav__list">
              <Link to="/movies" className={`nav__item ${location.pathname === "/movies" ? "nav__item_active" : ""}`}>
                Фильмы
              </Link>
              <Link to="/saved-movies" className={`nav__item ${location.pathname === "/saved-movies" ? "nav__item_active" : ""}`}>
                Сохранённые фильмы
              </Link>
            </li>
            <li>
              <ProfileButton />
            </li>
          </ul>
          <button
            type="button"
            className="nav__menu-toggle"
            onClick={onSideMenu} >
          </button>
        </nav>
      )
      }
    </>
  );
}

export default Navigation;
