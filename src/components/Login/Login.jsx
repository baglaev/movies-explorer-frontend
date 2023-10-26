import React from 'react';

import Auth from '../Auth/Auth';

function Login() {
  return (
    <main className="login">
      <section className="login__section" aria-label="Авторизация.">
        <Auth
          welcome="Рады видеть!"
          buttonText="Войти"
          formText="Ещё не зарегистрированы?"
          link="/signup"
          linkText="Регистрация"
        >
          <label className="auth__caption">E-mail
            <input
              required
              className="auth__input"
              name="email"
              type="email"
              placeholder="Обязательное поле"
            /></label>
          <label className="auth__caption">Пароль
            <input
              required
              className="auth__input auth__login"
              name="password"
              type="password"
              placeholder="Обязательное поле"
              minLength="2"
              maxLength="30"
            /></label>
        </Auth>
      </section>
    </main>
  )
}

export default Login;