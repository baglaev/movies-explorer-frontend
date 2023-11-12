import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import SideMenu from "../SideMenu/SideMenu";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Footer from "../Footer/Footer";
import { authorize, getUser, logout, register, saveMovie, deleteMovie, setUserInfo } from "../../utils/api";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import Preloader from "../Preloader/Preloader";
import InfoToolTip from "../InfoToolTip/InfoToolTip";



function App() {
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem("isUserLogin"));
  const [response, setResponse] = useState("");
  const [responseProfile, setResponseProfile] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [isFormValid, setFormValid] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoadingProfile, setLoadingProfile] = useState(false);

  const navigate = useNavigate();

  const checkToken = () => {
    getUser()
      .then((user) => {
        if (!user) {
          setLoggedIn(false);
        } else {
          setCurrentUser(user);
          setLoggedIn(true);
        }
      })
      .catch(() => {
        setLoggedIn(false);
        localStorage.clear();
      })
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getUser()
        .then((user) => {
          setCurrentUser(user.data);
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);

  function closeSideMenu() {
    setSideMenuOpen(false);
    setInfoToolTipOpen(null);
  };

  function handleSideMenuClick() {
    setSideMenuOpen(true);
  };

  function handleInfoToolTip() {
    setInfoToolTipOpen(true);
  }

  function handleLogin({ email, password }, setLoading) {
    authorize(email, password)
      .then((res) => {
        localStorage.setItem("isUserLogin", true)
        setSuccess(true);
        handleInfoToolTip();
        setLoggedIn(true);
        setCurrentUser(res);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setSuccess(false);
        setLoggedIn(false);
        handleInfoToolTip();
        if (err.includes("401")) {
          return setResponse("Вы ввели неправильный логин или пароль.")
        } else {
          return setResponse("При авторизации произошла ошибка. Переданный токен некорректен.")
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }

  function handleRegister({ name, email, password }, setLoading) {
    register(name, email, password)
      .then(() => {
        setSuccess(true);
        handleInfoToolTip();
        return handleLogin({ email, password }, setLoading);
      })
      .catch((err) => {
        setSuccess(false);
        handleInfoToolTip();
        if (err.includes("409")) {
          return setResponse("Пользователь с таким email уже существует.")
        } else {
          return setResponse("При регистрации пользователя произошла ошибка.")
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }

  function handleUpdateUser(values) {
    const { name, email } = values;
    setLoadingProfile(true);
    setUserInfo(name, email)
      .then((user) => {
        setCurrentUser({
          userId: user._id,
          email: user.email,
          name: user.name,
        });
        setSuccess(true);
        setUpdating(false);
        setResponseProfile("Данные успешно обновлены")
      })
      .catch((err) => {
        setSuccess(false);
        setUpdating(false);
        setFormValid(false);
        if (err.includes("409")) {
          return setResponseProfile("Пользователь с таким email уже существует.")
        } else {
          return setResponseProfile("При обновлении профиля произошла ошибка.")
        }
      })
      .finally(() => {
        setLoadingProfile(false);
      });
  }

  function handleLogout() {
    logout()
      .then(() => {
        setSuccess(true);
        handleInfoToolTip();
        setLoggedIn(false);
        navigate("/", { replace: true });
        setCurrentUser({});
        localStorage.clear();
      })
      .catch(() => {
        setSuccess(false);
        handleInfoToolTip();
      });
  }

  function handleSave(movie) {
    const isLiked = savedMovies.find(savedMovie => savedMovie.movieId === movie.id);

    if (!isLiked) {
      saveMovie({
        country: movie.country,
        description: movie.description,
        director: movie.director,
        duration: movie.duration,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        movieId: movie.id,
        nameEN: movie.nameEN,
        nameRU: movie.nameRU,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        trailerLink: movie.trailerLink,
        year: movie.year,
      })
        .then((movieToSave) => {
          setSavedMovies([movieToSave, ...savedMovies]);
          localStorage.setItem("savedMovies", JSON.stringify([movieToSave, ...savedMovies]));
        })
        .catch(console.error)
    } else {
      const movieId = (savedMovies.find(savedMovie => savedMovie.movieId === movie.id))._id;
      deleteMovie(movieId)
        .then(() => {
          setSavedMovies(savedMovies.filter((m) => m._id !== movieId))
          localStorage.setItem("savedMovies", JSON.stringify(savedMovies.filter((m) => m._id !== movieId)));
        })
        .catch(console.error)
    }
  };

  function handleDelete(movie) {
    setLoading(true);
    const movieId = movie._id;
    deleteMovie(movieId)
      .then(() => {
        setSavedMovies(savedMovies.filter((m) => m._id !== movieId))
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies.filter((m) => m._id !== movieId)));
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false)
      });
  };

  return (
    <div className="app">
      {isLoading
        ? (
          <Preloader />
        ) : (
          <CurrentUserContext.Provider value={currentUser}>
            <Routes>
              <Route exact path="/" element={
                <>
                  <Header
                    onSideMenu={handleSideMenuClick}
                    isLoggedIn={isLoggedIn}
                  />
                  <Main />
                  <Footer />
                </>
              }></Route>
              <Route exact path="/movies" element={
                <ProtectedRouteElement
                  element={Movies}
                  onSideMenu={handleSideMenuClick}
                  isLoggedIn={isLoggedIn}
                  setLoading={setLoading}
                  handleSave={handleSave}
                  handleDelete={handleDelete}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                />} />
              <Route exact path="/saved-movies" element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  onSideMenu={handleSideMenuClick}
                  isLoggedIn={isLoggedIn}
                  handleSave={handleSave}
                  handleDelete={handleDelete}
                  isLoading={isLoading}
                />} />
              <Route exact path="/profile" element={
                <ProtectedRouteElement
                  element={Profile}
                  onSideMenu={handleSideMenuClick}
                  handleUpdateUser={handleUpdateUser}
                  isLoggedIn={isLoggedIn}
                  handleLogout={handleLogout}
                  setCurrentUser={setCurrentUser}
                  responseProfile={responseProfile}
                  setResponseProfile={setResponseProfile}
                  isUpdating={isUpdating}
                  isFormValid={isFormValid}
                  setFormValid={setFormValid}
                  setUpdating={setUpdating}
                  setLoadingProfile={setLoadingProfile}
                  isLoadingProfile={isLoadingProfile}
                />} />
                <Route exact path="/signup" element={
                  <Register
                    handleRegister={handleRegister}
                    isLoggedIn={isLoggedIn}
                  />} />
                <Route exact path="/signin" element={
                  <Login
                    handleLogin={handleLogin}
                    isLoggedIn={isLoggedIn}
                  />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <SideMenu
              isSideMenuOpen={isSideMenuOpen}
              onSideMenuClose={closeSideMenu}
            />
            <InfoToolTip
              isSuccess={isSuccess}
              isInfoToolTipOpen={isInfoToolTipOpen}
              onSideMenuClose={closeSideMenu}
              handleInfoToolTipStatus={response}
            />
          </CurrentUserContext.Provider>
        )}
    </div>
  );
}

export default App;