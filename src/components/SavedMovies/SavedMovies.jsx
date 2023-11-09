import React from "react";
import { useState, useEffect } from "react";

import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { SHORT_MOVIE } from "../../utils/constants";
import { getSavedMovies } from "../../utils/api";

function SavedMovies({ onSideMenu, isLoggedIn, handleDelete, isLoading }) {
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [isToggleOn, setToggleOn] = useState(false);

  useEffect(() => {
    const moviesSaved = JSON.parse(localStorage.getItem("savedMovies"));
    if (!moviesSaved || []) {
      getSavedMovies()
        .then((movies) => {
          localStorage.setItem("savedMovies", JSON.stringify(movies));
          setSavedMovies(movies);
        })
        .catch(() => {
          setError("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
        })
    } else {
      setSavedMovies(moviesSaved);
    }
  }, [setSavedMovies])

  function handleSearch(searchQuery) {
    if (searchQuery) {
      setSearchQuery(searchQuery);
      const moviesSaved = JSON.parse(localStorage.getItem("savedMovies"));
      const filteredMovies = moviesSaved.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
      );
      localStorage.setItem("foundMoviesSaved", JSON.stringify(filteredMovies));

      if (filteredMovies.length !== 0) {
        setSavedMovies(filteredMovies);
        setError("");
      } else {
        setError("Ничего не найдено");
      }
      checkToggle(filteredMovies);
    }
  }

  function handleToggleClick() {
    setToggleOn(!isToggleOn);

    if (searchQuery) {
      const moviesSaved = JSON.parse(localStorage.getItem("savedMovies"));
      const searchFilteredMovies = moviesSaved.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
      );
      localStorage.setItem("foundMoviesSaved", JSON.stringify(searchFilteredMovies));

      if (isToggleOn !== true) {
        localStorage.setItem("isToggleSavedMovies", true);
        const filteredMoviesShort = searchFilteredMovies.filter((movie) => movie.duration <= SHORT_MOVIE);
        localStorage.setItem("foundMoviesSavedShort", JSON.stringify(filteredMoviesShort));
        if (filteredMoviesShort.length !== 0 && !isToggleOn) {
          setSavedMovies(JSON.parse(localStorage.getItem("foundMoviesSavedShort")));
          setError("");
        } else if (filteredMoviesShort.length === 0 && !isToggleOn) {
          return setError("Ничего не найдено");
        } else {
          setError("Нужно ввести ключевое слово");
        }
        return filteredMoviesShort;
      } else if (isToggleOn !== false) {
        localStorage.setItem("isToggleSavedMovies", false);
        setError("");
        if (searchFilteredMovies.length !== 0 && isToggleOn) {
          setError("");
          return setSavedMovies(JSON.parse(localStorage.getItem("foundMoviesSaved")));
          
        } else if (searchFilteredMovies.length === 0 && isToggleOn) {
          return setError("Ничего не найдено");
        } else {
          return setError("Нужно ввести ключевое слово");
        }
      }
    } else if (!searchQuery) {
      if (isToggleOn !== true) {
        localStorage.setItem("isToggleSavedMovies", true);
         const moviesSaved = JSON.parse(localStorage.getItem("savedMovies"));
        const filteredMoviesShort = moviesSaved.filter((movie) => movie.duration <= SHORT_MOVIE);
        localStorage.setItem("foundMoviesSavedShort", JSON.stringify(filteredMoviesShort));
        if (filteredMoviesShort.length !== 0 && !isToggleOn) {
          setSavedMovies(JSON.parse(localStorage.getItem("foundMoviesSavedShort")));
          setError("");
        } else if (filteredMoviesShort.length === 0 && !isToggleOn) {
          return setError("Ничего не найдено");
        } else {
          setError("Нужно ввести ключевое слово");
        }
        return filteredMoviesShort;
      } else if (isToggleOn !== false) {
        localStorage.setItem("isToggleSavedMovies", false);
        setError("");
        return setSavedMovies(JSON.parse(localStorage.getItem("savedMovies")));
      }
    }
  }

  function checkToggle(filteredMovies) {
    if (isToggleOn === true) {
      localStorage.setItem("isToggleSavedMovies", true);
      const filteredMoviesShortSaved = filteredMovies.filter((movie) => movie.duration <= SHORT_MOVIE);
      localStorage.setItem("foundMoviesSavedShort", JSON.stringify(filteredMoviesShortSaved));
      if (filteredMoviesShortSaved.length !== 0 && isToggleOn) {
        setSavedMovies(JSON.parse(localStorage.getItem("foundMoviesSavedShort")));
        setError("");
      } else {
        setError("Ничего не найдено");
      }
      return filteredMoviesShortSaved;
    } else if (isToggleOn === false) {
      localStorage.setItem("isToggleSavedMovies", false);
      return;
    }
  }
  return (
    <div className="saved-movies">
      <Header
        onSideMenu={onSideMenu}
        isLoggedIn={isLoggedIn}
      />
      <main className="content">
        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          isToggleOn={isToggleOn}
          handleToggleClick={handleToggleClick}
        />
        <MoviesCardList
          movies={savedMovies}
          error={error}
          handleDelete={handleDelete}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </div>
  )
}

export default SavedMovies;