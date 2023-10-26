import React from "react";

function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__toggle">
        <input className="filter-checkbox__input" type="checkbox" />
        <span className="filter-checkbox__switch"></span>
      </label>
      <span className="filter-checkbox__name">Короткометражки</span>
    </div >
  )
}

export default FilterCheckbox;