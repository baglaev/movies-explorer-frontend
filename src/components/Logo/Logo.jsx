import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../../images/header-logo.svg";

function Logo() {
  return (
    <div className="logo">
      <Link to="/" className="logo__link">
        <img
          className="logo__icon"
          src={headerLogo}
          alt="икона шапки"
        />
      </Link>
    </div>
  );
}

export default Logo;