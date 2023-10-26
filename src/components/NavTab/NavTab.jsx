import React from "react";

function NavTab() {
  return (
    <section className="nav-tab">
      <div>
        <ul className="nav-tab__items">
          <li className="nav-tab__item"><a href="#about-poject" className="nav-tab__link">О проекте</a></li>
          <li className="nav-tab__item"><a href="#techs" className="nav-tab__link">Технологии</a></li>
          <li className="nav-tab__item"><a href="#about-me" className="nav-tab__link">Студент</a></li>
        </ul>
      </div>
    </section>
  )
}

export default NavTab;