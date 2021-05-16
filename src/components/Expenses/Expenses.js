import React, { useState } from "react";

import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import "./Expenses.css";

import ExpensesFilter from "./ExpensesFilter";

function Expenses(props) {
  const actualYear = new Date().getFullYear().toString();
  const [filteredYear, setFilteredYear] = useState(actualYear);

  const onFilterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filtered_expenses = props.items.filter((expense) => {
    let expenseYear = expense.date.getFullYear().toString();
    // Show all expenses if 'filteredYear' is empty:
    return (
      filteredYear === "" ||
      expenseYear === filteredYear
    );
  });

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onFilterChange={onFilterChangeHandler}
      />
      <div>
        {filtered_expenses.map((expense) => (
          <ExpenseItem
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
            key={expense.id}
          />
        ))}
      </div>
    </Card>
  );
}

export default Expenses;
