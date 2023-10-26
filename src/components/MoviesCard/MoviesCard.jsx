import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import cardPoster from "../../images/film-image.png";

function MoviesCard({ card }) {
  const location = useLocation();
  const [isSaved, setSaved] = useState(false);

  function handleClick() {
    setSaved(!isSaved);
  };
  return (
    <section className="movies-card" aria-label="Карточка фильма.">
      <img className="movies-card__image" src={cardPoster} alt={`Постер фильма ${card}`} />
      <h2 className="movies-card__name">33 слова о дизайне</h2>
      <>
        {location.pathname === "/movies" && (
          <button
            className={`movies-card__button ${isSaved ? "movies-card__button_active" : ""}`}
            type="button"
            onClick={handleClick}
          />
        )}
        {location.pathname === "/saved-movies" && (
          <button
            className="movies-card__delete-button"
            type="button"
            onClick={handleClick}
          />
        )}
      </>
      <p className="movies-card__length">1ч42м</p>
    </section>
  )
}

export default MoviesCard;