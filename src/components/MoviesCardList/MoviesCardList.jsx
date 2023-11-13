import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, handleSave, handleDelete, error }) {
  return (
    <section className="movies-card-list">
      {
        error !== "" ?
          <span className="movies-card-list__error-message">{error}</span>
          :
          <ul className="movies-card-list__list">
            {movies.map((movie) => (
              <MoviesCard key={movie.id || movie._id}
                movie={movie}
                handleSave={handleSave}
                handleDelete={handleDelete}
              />
            ))}
          </ul>}
    </section >
  )
}

export default MoviesCardList;