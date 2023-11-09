import React from "react";

function FilterCheckbox({ isToggleOn, handleToggleClick }) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__toggle">
        <input className="filter-checkbox__input" type="checkbox" defaultChecked={isToggleOn} onChange={handleToggleClick}/>
        <span className="filter-checkbox__switch"></span>
      </label>
      <span className="filter-checkbox__name">Короткометражки</span>
    </div >
  )
}

export default FilterCheckbox;