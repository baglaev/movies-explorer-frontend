import React from "react";
import { useState, useEffect } from "react";

import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import MoviesCard from "../MoviesCard/MoviesCard";
import Footer from "../Footer/Footer";
import { getSavedMovies } from "../../utils/api";
import {
  SHORT_MOVIE,
  MOVIECARD_16,
  MOVIECARD_8,
  MOVIECARD_5,
  MOVIECARD_4,
  MOVIECARD_2,
  MOVIECARD_1,
  DESKTOP_VIEW,
  MOBILE_VIEW
} from "../../utils/constants";
import { getMovies } from "../../utils/moviesApi";

function Movies({ onSideMenu, isLoggedIn, setLoading, handleSave, handleDelete, setSavedMovies }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [foundMovies, setFoundMovies] = useState([]);
  const [error, setError] = useState("");
  const [isToggleOn, setToggleOn] = useState(false || !!(localStorage.getItem("isToggle") === "true"));
  const [movieToView, setMovieToView] = useState(foundMovies);
  const [isMoreButtonActive, setMoreButtonActive] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    setSearchQuery(JSON.parse(localStorage.getItem("keyword")));
    if (localStorage.getItem("isToggle") === "true") {
      setFoundMovies(JSON.parse(localStorage.getItem("foundMoviesShort")));
    };
    if (localStorage.getItem("isToggle") === "false") {
      setFoundMovies(JSON.parse(localStorage.getItem("foundMovies")));
    };
  }, [isToggleOn])

  useEffect(() => {
    const moviesSaved = JSON.parse(localStorage.getItem("savedMovies"));
    if (!moviesSaved) {
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

  useEffect(() => {
    if (movieToView.length < foundMovies.length) {
      setMoreButtonActive(true);
    } else {
      setMoreButtonActive(false);
    }
  }, [foundMovies.length, movieToView.length]);

  useEffect(() => {
    if (width > DESKTOP_VIEW) {
      setMovieToView(foundMovies.slice(0, MOVIECARD_16));
    }
    else if (MOBILE_VIEW < width && width < DESKTOP_VIEW) {
      setMovieToView(foundMovies.slice(0, MOVIECARD_8));
    } else if (width < MOBILE_VIEW) {
      setMovieToView(foundMovies.slice(0, MOVIECARD_5));
    }
  }, [width, foundMovies]);

  useEffect(() => {
    window.addEventListener("resize", timeout);
    return () => {
      window.removeEventListener("resize", timeout);
    }
  })

  // function handleToggleClick() {
  //   setToggleOn(!isToggleOn);
  //   const filteredMovies = JSON.parse(localStorage.getItem("foundMovies"));
  //   const beatFilms = JSON.parse(localStorage.getItem("initialMovies"));

  //   if (!filteredMovies) {
  //     localStorage.setItem("keyword", JSON.stringify(searchQuery));
  //     setSearchQuery(JSON.parse(localStorage.getItem("keyword")));
  //     return setToggleOn(!isToggleOn);
  //   };

  //   if (searchQuery || filteredMovies) {
  //     localStorage.setItem("keyword", JSON.stringify(searchQuery));
  //     setSearchQuery(JSON.parse(localStorage.getItem("keyword")));
  //     const filteredMovies = beatFilms.filter((movie) =>
  //       movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     localStorage.setItem("searchFoundMovies", JSON.stringify(filteredMovies));

  //       if (isToggleOn !== true) {
  //         localStorage.setItem("isToggle", true);
  //         const filteredMoviesShort = filteredMovies.filter((movie) => movie.duration <= SHORT_MOVIE);
  //         localStorage.setItem("foundMoviesShort", JSON.stringify(filteredMoviesShort));
  //         if (filteredMoviesShort.length !== 0 && !isToggleOn) {
  //           setFoundMovies(JSON.parse(localStorage.getItem("foundMoviesShort")));
  //           setError("");
  //         } else if (filteredMoviesShort.length === 0 && !isToggleOn) {
  //           setMoreButtonActive(false);
  //           return setError("Ничего не найдено");
  //         } else {
  //           setError("Нужно ввести ключевое слово");
  //           setMoreButtonActive(false);
  //         }
  //         return filteredMoviesShort;
  //       } else if (isToggleOn !== false) {
  //         localStorage.setItem("isToggle", false);
  //         setError("");
  //         if (filteredMovies.length !== 0) {
  //           setFoundMovies(filteredMovies);
  //           setError("");
  //         } else if (filteredMovies.length === 0) {
  //           return setError("Ничего не найдено");
  //         } else {
  //           setError("Нужно ввести ключевое слово");
  //         }
  //     }
  //   }
  // }

  function handleToggleClick() {
    const initialMovies = JSON.parse(localStorage.getItem("initialMovies"));
  
    if (searchQuery || !initialMovies) {
      localStorage.setItem("keyword", JSON.stringify(searchQuery));
      setSearchQuery(JSON.parse(localStorage.getItem("keyword")));
      const filteredMovies = initialMovies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      checkToggle(filteredMovies);
    }
  }
  

  // function checkToggle(filteredMovies) {
  //   if (isToggleOn === true) {
  //     localStorage.setItem("isToggle", true);
  //     const filteredMoviesShort = filteredMovies.filter((movie) => movie.duration <= SHORT_MOVIE);
  //     localStorage.setItem("foundMoviesShort", JSON.stringify(filteredMoviesShort));
  //     if (filteredMoviesShort.length !== 0 && isToggleOn) {
  //       setFoundMovies(JSON.parse(localStorage.getItem("foundMoviesShort")));
  //       setError("");
  //     } else if (filteredMoviesShort.length === 0 && isToggleOn) {
  //       setError("Ничего не найдено");
  //       setMoreButtonActive(false);
  //     } else {
  //       setError("Нужно ввести ключевое слово");
  //       setMoreButtonActive(false);
  //     }
  //     return filteredMoviesShort;
  //   } else if (isToggleOn === false) {
  //     localStorage.setItem("isToggle", false);
  //     setError("");
  //     return setFoundMovies(JSON.parse(localStorage.getItem("foundMovies")));
  //   }
  // }

  function checkToggle(filteredMovies) {
    const isToggleOn = !!localStorage.getItem("isToggle") === true;
  
    if (isToggleOn) {
      localStorage.setItem("isToggle", true);
      const filteredMoviesShort = filteredMovies.filter((movie) => movie.duration <= SHORT_MOVIE);
      localStorage.setItem("foundMoviesShort", JSON.stringify(filteredMoviesShort));
  
      if (filteredMoviesShort.length !== 0) {
        setFoundMovies(JSON.parse(localStorage.getItem("foundMoviesShort")));
        setError("");
      } else {
        setError("Ничего не найдено");
        setMoreButtonActive(false);
      }
    } else {
      localStorage.setItem("isToggle", false);
      setError("");
      setFoundMovies(filteredMovies);
    }
  }
  

  function timeout() {
    setTimeout(() => { setWidth(window.innerWidth) }, 5)
  }

  async function handleSearch(searchQuery) {
    if (!searchQuery) {
      localStorage.setItem("keyword", JSON.stringify(""));
      setError("Нужно ввести ключевое слово");
      setMoreButtonActive(false);
    };

    if (searchQuery && localStorage.getItem("initialMovies")) {
      setSearchQuery(searchQuery);
      localStorage.setItem("keyword", JSON.stringify(searchQuery));
      const beatFilms = JSON.parse(localStorage.getItem("initialMovies"));
      const filteredMovies = beatFilms.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
      );
      localStorage.setItem("foundMovies", JSON.stringify(filteredMovies));

      if (filteredMovies.length !== 0) {
        setFoundMovies(filteredMovies);
        setError("");
      } else {
        setError("Ничего не найдено");
        setMoreButtonActive(false);
      }
      checkToggle(filteredMovies);
    } else if (searchQuery && !localStorage.getItem("initialMovies")) {
      setLoading(true);
      const data = await getMovies();
      localStorage.setItem("initialMovies", JSON.stringify(data));
      setFoundMovies(data);
      localStorage.setItem("keyword", JSON.stringify(searchQuery));
      const beatFilms = JSON.parse(localStorage.getItem("initialMovies"));
      const filteredMovies = beatFilms.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
      );
      localStorage.setItem("foundMovies", JSON.stringify(filteredMovies));

      if (filteredMovies.length !== 0) {
        setFoundMovies(filteredMovies);
        setError("");
      } else {
        setError("Ничего не найдено");
        setMoreButtonActive(false);
      }
      checkToggle(filteredMovies);
    }
    setLoading(false);
  }

  function moreMoviesClick() {
    if (movieToView.length < foundMovies.length && width > DESKTOP_VIEW) {
      setMovieToView(foundMovies.slice(0, movieToView.length + MOVIECARD_4));
    } else if (movieToView.length < foundMovies.length && MOBILE_VIEW < width && width < DESKTOP_VIEW) {
      setMovieToView(foundMovies.slice(0, movieToView.length + MOVIECARD_2));
    } else if (movieToView.length < foundMovies.length && width < MOBILE_VIEW) {
      setMovieToView(foundMovies.slice(0, movieToView.length + MOVIECARD_1));
    }
  }

  return (
    <div className="movies">
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
          movies={movieToView}
          error={error}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
        <div className="more-movies-button">
          {isMoreButtonActive &&
            <button
              className="more-movies-button__name"
              type="button"
              onClick={moreMoviesClick}>
              Ещё
            </button>
          }
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Movies;