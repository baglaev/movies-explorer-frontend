import React from "react";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Header from "../Header/Header";
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useFormWithValidation } from "../../hook/useFormWithValidation";
import { RegexEmail, RegexName } from "../../utils/constants";

function Profile({ onSideMenu, isLoggedIn, responseProfile, setResponseProfile, handleUpdateUser, handleLogout, isUpdating, isFormValid, setFormValid, setUpdating, setLoadingProfile, isLoadingProfile }) {
  const { values, setValues, handleChange, errors, setErrors, isValid } = useFormWithValidation();

  const currentUser = useContext(CurrentUserContext);
  const initialUser = values.name !== currentUser.name || values.email !== currentUser.email;


  useEffect(() => {
    if (errors.name || errors.email || responseProfile) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [errors, responseProfile, setFormValid]);

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    })
  }, [currentUser, setResponseProfile, setValues]);

  function changeName(evt) {
    handleChange(evt);
    const { name, value } = evt.target;
    if (!RegexName.test(value)) {
      setErrors({ ...errors, [name]: "Поле name должно содержать только латиницу, кириллицу, пробел или дефис." });
    }
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

  function onClick() {
    setUpdating(!isUpdating);
    setResponseProfile("");
  }

  function onSubmit(evt) {
    evt.preventDefault();
    handleUpdateUser(values, setLoadingProfile);
  };

  return (
    <div className="profile">
      <Header
        onSideMenu={onSideMenu}
        isLoggedIn={isLoggedIn}
      />
      <main className="profile__main">
        <section className="profile__section" aria-label="Профайл." >
          <h1 className="profile__welcome">
            Привет, {currentUser.name}!
          </h1>
          <form className="profile__form" onSubmit={onSubmit} noValidate>
            <label className="profile__name profile__field">
              <span className="profile__placeholder">Имя</span>
              <input
                required
                className="profile__input"
                name="name"
                type="text"
                minLength={2}
                maxLength={30}
                placeholder="Имя"
                value={values.name || ""}
                onChange={changeName}
                disabled={isLoadingProfile}
              />
            </label>
            <label className="profile__email profile__field">
              <span className="profile__placeholder">E-mail</span>
              <input
                required
                className="profile__input"
                name="email"
                type="email"
                placeholder="email"
                value={values.email || ""}
                onChange={changeEmail}
                disabled={isLoadingProfile}
              /></label>

            {isUpdating ?
              <div className="profile__button-container">
                <span className="profile__error-message">{errors.name || errors.email || responseProfile}</span>
                <button type="submit" className={!isValid || !initialUser || !isFormValid || isLoadingProfile ? "profile__button-save_disabled" : "profile__button-save"} disabled={!initialUser || isLoadingProfile || !isFormValid} onClick={onSubmit}>{isLoadingProfile ? "Сохраняем..." : "Сохранить"}</button>
              </div>
              :
              <>
                <div className="profile__button-container">
                  <span className="profile__error-message">{responseProfile}</span>
                  <button type="submit" className="profile__button" onClick={onClick}>Редактировать</button>
                </div>

                <Link to="/" className="profile__link" onClick={handleLogout}>Выйти из аккаунта</Link>
              </>
            }
          </form>
        </section>
      </main>
    </div>
  );
}

export default Profile;