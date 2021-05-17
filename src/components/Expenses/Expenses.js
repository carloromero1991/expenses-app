import React, { useState } from "react";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import "./Expenses.css";

function Expenses(props) {
  const actualYear = new Date().getFullYear().toString();
  const [filteredYear, setFilteredYear] = useState(actualYear);

  const onFilterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = props.items.filter((expense) => {
    let expenseYear = expense.date.getFullYear().toString();
    // Show all expenses if 'filteredYear' is empty:
    return filteredYear === "" || expenseYear === filteredYear;
  });

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onFilterChange={onFilterChangeHandler}
      />
      <ExpensesList items={filteredExpenses} />
    </Card>
  );
}

export default Expenses;
