import React, { useState } from "react";

import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";

import IndexedDB from "./IndexedDB";

// Control variable:
let gotData = false;

function App() {
  const [expenses, setExpenses] = useState({});
  const idbConfig = {
    dbName: "expenses-app",
    storeName: "expenses",
    indexes: ["id", "title", "amount", "date"],
  };

  if (!gotData) {
    IndexedDB.GetDataAsync(idbConfig)
      .then((data) => {
        gotData = true;
        // console.log("IndexedDB().GetData() from App has finished");
        setExpenses(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const addExpenseHandler = (expense) => {
    // console.log("addExpenseHandler", expense);
    IndexedDB.SaveDataAsync(idbConfig, expense)
      .then((result) => {
        gotData = true;
        // console.log("IndexedDB().SaveDataAsync() from App has finished");

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
