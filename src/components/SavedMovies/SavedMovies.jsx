import React from "react";

import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import Footer from "../Footer/Footer";

function SavedMovies({ onSideMenu }) {
  return (
    <div className="saved-movies">
      <Header
        onSideMenu={onSideMenu}
      />
      <main className="content">
        <SearchForm />
        <MoviesCardList>
          <li className="movies-card-list__item"><MoviesCard /></li>
          <li className="movies-card-list__item"><MoviesCard /></li>
          <li className="movies-card-list__item"><MoviesCard /></li>
        </MoviesCardList>
      </main>
      <Footer />
    </div>
  )
}

export default SavedMovies;