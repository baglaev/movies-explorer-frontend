import React from "react";
import { Routes, Route } from "react-router-dom";

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

function App() {
  const [isSideMenu, setSideMenu] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  function closeSideMenu() {
    setSideMenu(false);
  };
  function handleSideMenuClick() {
    setSideMenu(true);
  };
  return (
    <div className="app">
      <Routes>
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/signin" element={<Login />} />
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
        <Route exact path="/movies" element={<Movies
          onSideMenu={handleSideMenuClick}
        />} />
        <Route exact path="/saved-movies" element={<SavedMovies
          onSideMenu={handleSideMenuClick}
        />} />
        <Route exact path="/profile" element={<Profile
          onSideMenu={handleSideMenuClick}
        />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <SideMenu
        isSideMenuOpen={isSideMenu}
        onSideMenuClose={closeSideMenu}
      />
    </div>
  );
}

export default App;