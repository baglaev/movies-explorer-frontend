import React from 'react';
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useFormWithValidation } from "../../hook/useFormWithValidation";
import { RegexEmail } from "../../utils/constants";

import Auth from '../Auth/Auth';

function Login({ handleLogin, isLoggedIn }) {
  const [isFormValid, setFormValid] = useState(false);
  const { values, handleChange, errors, setErrors } = useFormWithValidation();

  useEffect(() => {
    if (errors.email || errors.password || !values.email || !values.password) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [errors, values.email, values.password]);


  function handleSubmit(evt, setLoading) {
    evt.preventDefault();

    handleLogin(values, setLoading);
  }

  function changeEmail(evt) {
    handleChange(evt);
    const { name, value } = evt.target;
    if (name === "email") {
      if (!RegexEmail.test(value)) {
        setErrors({ ...errors, email: "Поле email не соответствует шаблону электронной почты." });
      }
    }
  }

  if (isLoggedIn) {
    return <Navigate to="/profile" />
  }

  return (
    <main className="login">
      <section className="login__section" aria-label="Авторизация.">
        <Auth
          welcome="Рады видеть!"
          buttonText="Войти"
          formText="Ещё не зарегистрированы?"
          link="/signup"
          linkText="Регистрация"
          isValid={isFormValid}
          handleSubmit={handleSubmit}
        >
          <label className="auth__caption">E-mail
            <input
              onChange={changeEmail}
              value={values.email || ""}
              required
              className="auth__input"
              name="email"
              type="email"
              placeholder="Обязательное поле"
            />
            <span className="auth__error-text">{errors.email}</span>
            </label>
          <label className="auth__caption">Пароль
            <input
              onChange={handleChange}
              required
              className="auth__input auth__login"
              name="password"
              type="password"
              placeholder="Обязательное поле"
              minLength={2}
              maxLength={30}
            />
            <span className="auth__error-text">{errors.password}</span>
            </label>
        </Auth>
      </section>
    </main>
  )
}

export default Login;