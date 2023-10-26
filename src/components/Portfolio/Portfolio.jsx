import React from "react";
import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <section className="portfolio" aria-label="Портфолио.">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__items">
        <li className="portfolio__item">
          <Link to="https://github.com/baglaev/how-to-learn"
            className="portfolio__item-link"
            target="_blank"
            rel="noopener noreferrer"
          ><p className="portfolio__item-title">Статичный сайт</p>
            <div className="portfolio__image"></div>
          </Link>
        </li>
        <li className="portfolio__item">
          <Link to="https://github.com/baglaev/russian-travel"
            className="portfolio__item-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="portfolio__item-title">Адаптивный сайт</p>
            <div className="portfolio__image"></div>
          </Link>
        </li>
        <li className="portfolio__item">
          <Link to="https://github.com/baglaev/react-mesto-api-full-gha"
            className="portfolio__item-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="portfolio__item-title">Одностраничное приложение</p>
            <div className="portfolio__image"></div>
          </Link>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;