import React from "react";
import { Link } from "react-router-dom";

function ProfileButton() {
  return (
    <Link to="/profile" className="profile-button">
      <span className="profile-button__image"></span>
      <p className="profile-button__text">Аккаунт</p>
    </Link>
  )
}

export default ProfileButton;