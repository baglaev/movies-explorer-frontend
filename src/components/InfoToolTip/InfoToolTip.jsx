import React from "react";
import successPath from "../../images/success.svg";
import goeswrongPath from "../../images/goeswrong.svg";
import usePopupClose from "../../hook/useSideMenuClose";

function InfoToolTip({ isInfoToolTipOpen, onSideMenuClose, isSuccess, handleInfoToolTipStatus }) {
  usePopupClose(isInfoToolTipOpen, onSideMenuClose)
  return (
    <div className={`popup popup_type_tooltip ${isInfoToolTipOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__button-closed button"
          type="button"
          onClick={onSideMenuClose}
        >
        </button>
        <img className="infoTooltip__status" src={isSuccess ? successPath : goeswrongPath} alt={isSuccess ? "Получилось" : "Что-то пошло не так"} />
        <h2 className="popup__title">{!isSuccess ? handleInfoToolTipStatus : ""}</h2>
      </div>
    </div>
  )
}

export default InfoToolTip;