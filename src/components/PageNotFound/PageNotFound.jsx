import React from "react";
// import { Link } from "react-router-dom";

function PageNotFound() {

  function backPage() {
    window.history.go(-1);
  }
  
  return (
    <main className="not-found">
      <section className="not-found__container">
        <p className="not-found__number">404</p>
        <p className="not-found__title">Страница не найдена</p>
        <button  className="not-found__link" type="button" onClick={backPage}>Назад</button >
      </section>
    </main>
  )
}

export default PageNotFound; 