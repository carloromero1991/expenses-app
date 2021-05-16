import React from "react";
// import React, { useState } from "react";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";

function ExpenseItem(props) {
  /*
  const [title, setTitle] = useState(props.title);
  console.log("ExpenseItem is evaluated by React");
  const clickHandler = () => {
    setTitle("Updated!");
    console.log(title);
  };
  <h2>{title}</h2>
  <button onClick={clickHandler}>Change Title</button>
  */

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
    </Card>
  );
}

export default ExpenseItem;
