import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <main className="not-found">
      <section className="not-found__container">
        <p className="not-found__number">404</p>
        <p className="not-found__title">Страница не найдена</p>
        <Link className="not-found__link" to="/">Назад</Link>
      </section>
    </main>
  )
}

export default PageNotFound; 