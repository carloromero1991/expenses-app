import React, { useState } from "react";
import "./ExpenseForm.css";

/**
 * TODO: Add programmatic max value on date input
 */

export default function ExpenseForm(props) {
  // Initialize states:
  const [enteredTitle, setEnteredTitle] = useState(""),
    [enteredAmount, setEnteredAmount] = useState(""),
    [enteredDate, setEnteredDate] = useState(""),
    [isAddingExpense, setIsAddingExpense] = useState(false),
    [isValid, setIsValid] = useState(true),
    [validationMessage, setValidationMessage] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (enteredTitle.length < 3) {
      setValidationMessage("Title should be larger than 3 characters");
      setIsValid(false);
    } else {
      const expenseData = {
        title: enteredTitle,
        amount: +enteredAmount,
        date: new Date(enteredDate + "T00:00:00"), // Correct date bug
      };

      props.onSaveExpenseData(expenseData);
      setEnteredTitle("");
      setEnteredAmount("");
      setEnteredDate("");
      setIsAddingExpense(false);
      setIsValid(true);
    }
  };

  function addNewExpenseHandler(event) {
    setIsAddingExpense(true);
  }

  function cancelAddNewExpenseHandler(event) {
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
    setIsAddingExpense(false);
  }

  let formContent = isAddingExpense ? (
    <form onSubmit={submitHandler}>
      <div>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
            required
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
            required
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
            required
          />
        </div>
      </div>
      <div className="form-footer">
        <div>
          <small className={`${isValid && "display-none"}`}>
            {validationMessage}
          </small>
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="cancel"
            onClick={cancelAddNewExpenseHandler}
          >
            Cancel
          </button>
          <button type="submit">Add Expense</button>
        </div>
      </div>
    </form>
  ) : (
    <button type="button" className="secondary" onClick={addNewExpenseHandler}>
      Add New Expense
    </button>
  );

  return <div>{formContent}</div>;
}
