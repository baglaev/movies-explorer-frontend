import React from "react";
import Auth from "../Auth/Auth";

function Register() {
  return (
    <main className="register">
      <section className="register__section">
        <Auth
          welcome="Добро пожаловать!"
          buttonText="Зарегистрироваться"
          formText="Уже зарегистрированы?"
          link="/signin"
          linkText="Войти"
        >
          <label className="auth__caption">Имя
            <input
              className="auth__input"
              name="name"
              type="text"
              placeholder="Имя пользователя"
              minLength="2"
              maxLength="30"
              required
            />
          </label>
          <label className="auth__caption">E-mail
            <input
              className="auth__input"
              name="email"
              type="email"
              placeholder="Почта пользователя"
              minLength="2"
              maxLength="30"
              required
            />
          </label>
          <label className="auth__caption">Пароль
            <input
              className="auth__input"
              name="password"
              type="password"
              placeholder="Пароль пользователя"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="auth__error">Что-то пошло не так...</span>
          </label>
        </Auth>
      </section>
    </main>
  )
}

export default Register;