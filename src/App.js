import React, { useState } from "react";

import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";

import IndexedDB from "./IndexedDB";

function App() {
  /*   const DUMMY_EXPENSES = [
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    {
      id: "e2",
      title: "New TV",
      amount: 799.49,
      date: new Date(2021, 2, 12),
    },
    {
      id: "e3",
      title: "Car Insurance",
      amount: 294.67,
      date: new Date(2020, 2, 28),
    },
    {
      id: "e4",
      title: "New Desk (Wooden)",
      amount: 450,
      date: new Date(2021, 5, 12),
    },
  ]; */

  const [expenses, setExpenses] = useState({});

  IndexedDB()
    .GetData("expenses-app","expenses")
    .then((data) => {
      setExpenses(data);
    })
    .catch((err) => {
      console.error(err);
    });

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  let content = (
    <p style={{ textAlign: "center" }}>No expenses saved. Maybe add one?</p>
  );

  if (expenses.length > 0) {
    content = <Expenses items={expenses} />;
  }

  return (
    <div className="center-div">
      <NewExpense onAddExpense={addExpenseHandler} />
      {content}
    </div>
  );
}

export default App;
