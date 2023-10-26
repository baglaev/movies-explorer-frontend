import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
      <div className="footer__block">
        <p className="footer__link footer__link-year">&copy; 2023</p>
        <ul className="footer__links">
          <li><a href="https://practicum.yandex.ru/" className="footer__link" target="_blank"
            rel="noopener noreferrer">Яндекс.Практикум</a></li>
          <li><a href="https://github.com/baglaev" className="footer__link" target="_blank"
            rel="noopener noreferrer">Github</a></li>
        </ul>
      </div >
    </footer >
  )
}

export default Footer;