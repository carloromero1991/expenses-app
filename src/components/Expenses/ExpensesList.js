import React from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

export default function ExpensesList(props) {
  if (props.items.length === 0) {
    return <p>No expenses found.</p>;
  }

  return (
    <ul className="expenses-list">
      {props.items.map((expense) => (
        <ExpenseItem
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
          key={expense.id}
        />
      ))}
    </ul>
  );
}
