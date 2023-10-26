import React from "react";
import { Link } from "react-router-dom";

import Logo from "../Logo/Logo";

function Auth({ welcome, children, buttonText, formText, link, linkText }) {
  return (
    <div className="auth">
      <Logo />
      <p className="auth__title">
        {welcome}
      </p>
      <form className="auth__form">
        {children}
        <button type="submit" className="auth__submit-button">{buttonText}</button>
      </form>
      <div className="auth__link-block">
        <p className="auth__link-text">{formText}
        <Link to={link} className="auth__link"> {linkText}</Link></p>
      </div>
    </div>
  );
}

export default Auth;