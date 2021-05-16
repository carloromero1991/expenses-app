import React, { useState } from "react";

import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import "./Expenses.css";

import ExpensesFilter from "./ExpensesFilter";

function Expenses(props) {
  const [expenses, setExpenses] = useState(props.items);

  function onFilterChangeHandler(selectedYear) {
    // console.log("Expenses, received 'enteredYear':", enteredYear);

    if (selectedYear === "") {
      // 'expenses' will be reseted if value is empty
      setExpenses(props.items);
    } else {
      // 'expenses' will be filtered
      let filtered_expenses = props.items.filter((expense) => {
        let expenseYear = expense.date.getFullYear().toString();
        // console.log(expenseYear, enteredYear);
        return expenseYear === selectedYear;
      });

      // console.log(filtered_expenses);
      setExpenses(filtered_expenses);
    }
  }

  return (
    <Card className="expenses">
      <ExpensesFilter onFilterChange={onFilterChangeHandler} />
      <div>
        {expenses.map((expense) => (
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
