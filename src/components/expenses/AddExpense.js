import React, { useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

import ExpenseItem from "./ExpenseItem";

const AddExpense = () => {
  const [expense, setExpense] = useState({
    reason: "",
    amount: "",
  });

  const expenses = [
    {
      id: 1,
      reason: "Bought car",
      amount: 5000,
    },
  ];

  const onChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };
  const { reason, amount } = expense;

  const onSubmit = () => {
    if (reason === "" || amount === "") {
      M.toast({ html: "Please fill all the fields" });
    } else {
      console.log(expense);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Spent On..."
        name="reason"
        value={reason}
        onChange={onChange}
      />
      <input
        type="number"
        placeholder="Amount"
        name="amount"
        value={amount}
        onChange={onChange}
      />
      <button
        type="button"
        className="waves-effect waves-light btn-small red lighten-1"
        onClick={onSubmit}
      >
        <i className="material-icons left">remove</i>
        Spent
      </button>
      {expenses.map((expense) => (
        <ExpenseItem expense={expense} key={expense.id} />
      ))}
    </div>
  );
};
export default AddExpense;
