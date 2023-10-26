import React from "react";

function AboutProject() {
  return (
    <section className="about-project" id="about-poject">
      <h2 className="about-project__title title">О проекте</h2>
      {/* <h2 className="title">О проекте</h2> */}
      <ul className="about-project__list">
        <li className="about-project__element">
          <p className="about-project__subtitle">Дипломный проект включал 5 этапов</p>
          <p className="about-project__element-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="about-project__element">
          <p className="about-project__subtitle">На выполнение диплома ушло 5 недель</p>
          <p className="about-project__element-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p></li>
      </ul>
      <ul className="about-project__container">
        <li>
          <p className="about-project__container-length about-project__container-length_size_s">1 неделя</p>
          <p className="about-project__container-title">Back-end</p>
        </li>
        <li>
          <p className="about-project__container-length about-project__container-length_size_l">4 недели</p>
          <p className="about-project__container-title">Front-end</p>
        </li>
      </ul>
    </section>
  )
}

export default AboutProject;