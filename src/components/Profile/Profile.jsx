import React from "react";
import { Link } from "react-router-dom";

import Header from "../Header/Header";

function Profile({ onSideMenu }) {
  return (
    <div className="profile">
      <Header onSideMenu={onSideMenu}/>
      <main className="profile__main">
        <section className="profile__section">
          <h2 className="profile__title">Привет, Пользователь!</h2>
          <form className="profile__form">
            <label className="profile__label">
              <span className="profile__placeholder">Имя</span>
              <input
                className="profile__input"
                name="name"
                type="text"
                value="Пользователь"
                minLength="2"
                maxLength="30"
                placeholder="Имя"
                required
              />
            </label>
            <label className="profile__label">
              <span className="profile__placeholder">E-mail</span>
              <input
                className="profile__input"
                name="email"
                type="email"
                value="mail@yandex.ru"
                minLength="2"
                maxLength="30"
                placeholder="email"
                required
              /></label>
            <button type="submit" className="profile__button">Редактировать</button>
          </form>
          <Link to="/" className="profile__logout">Выйти из аккаунта</Link>
        </section>
      </main>
    </div>
  );
}

export default Profile;