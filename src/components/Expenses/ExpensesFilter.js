import React from "react";

import "./ExpensesFilter.css";

const ExpensesFilter = (props) => {
  const actualYear = new Date().getFullYear();
  let years = [];

  for (let year = actualYear; year >= 2019; year--) {
    years.push(year);
  }

  function yearFilterChangeHandler(yearFilter) {
    const selectedYear = yearFilter.target.value;
    props.onFilterChange(selectedYear);
  }

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        <select value={props.selected} onChange={yearFilterChangeHandler}>
          <option value="">All</option>
          {years.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
