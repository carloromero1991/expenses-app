import React, { useEffect, useState } from "react";

import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";

import IndexedDB from "./IndexedDB";

const idbConfig = {
  dbName: "expenses-app",
  storeName: "expenses",
  indexes: ["id", "title", "amount", "date"],
};

function App() {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    IndexedDB.GetDataAsync(idbConfig)
      .then((data) => {
        console.log("IndexedDB.GetData() from App has finished");
        setExpenses(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const addExpenseHandler = (expense) => {
    // console.log("addExpenseHandler", expense);
    IndexedDB.SaveDataAsync(idbConfig, expense)
      .then((result) => {
        setExpenses((prevExpenses) => {
          return [expense, ...prevExpenses];
        });
      })
      .catch((err) => {
        console.error(err);
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
