import React from "react";

import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import Footer from "../Footer/Footer";

function Movies({ onSideMenu }) {
  return (
    <div className="movies">
      <Header
        onSideMenu={onSideMenu}
      />
      <main className="content">
        <SearchForm />
        <MoviesCardList>
          <li className="movies-card-list__item"><MoviesCard /></li>
          <li className="movies-card-list__item"><MoviesCard /></li>
          <li className="movies-card-list__item"><MoviesCard /></li>
          <li className="movies-card-list__item"><MoviesCard /></li>
          <li className="movies-card-list__item"><MoviesCard /></li>
          <li className="movies-card-list__item"><MoviesCard /></li>
          <li className="movies-card-list__item"><MoviesCard /></li>
          <li className="movies-card-list__item"><MoviesCard /></li>
          <li className="movies-card-list__item"><MoviesCard /></li>
          <li className="movies-card-list__item"><MoviesCard /></li>
          <li className="movies-card-list__item"><MoviesCard /></li>
          <li className="movies-card-list__item"><MoviesCard /></li>
          <li className="movies-card-list__item"><MoviesCard /></li>
          <li className="movies-card-list__item"><MoviesCard /></li>
          <li className="movies-card-list__item"><MoviesCard /></li>
          <li className="movies-card-list__item"><MoviesCard /></li>
        </MoviesCardList>
        <div className="more-movies-button">
          <button className="more-movies-button__name" type="button">Ещё</button>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Movies;