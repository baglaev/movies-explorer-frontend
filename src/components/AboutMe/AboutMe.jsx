import React from "react";

import Avatar from "../../images/user-image.jpg";

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title title">Студент</h2>
      {/* <h2 className="title">Студент</h2> */}
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__subtitle">Александр</h3>
          <p className="about-me__profession">Фронтенд-разработчик, 25 лет</p>
          <p className="about-me__about">Родился и долгое время прожил в Воронеже, сейчас проживаю и работаю в городе Санкт-Петербург. Люблю хоккей и разбираться в новых технологиях.</p>
          <a href="https://github.com/baglaev" className="about-me__link" target="_blank"
            rel="noopener noreferrer">Github</a></div>
        <img
          className="about-me__image"
          src={Avatar}
          alt="аватарка пользователя"
        />
      </div>
    </section>
  )
}

export default AboutMe;