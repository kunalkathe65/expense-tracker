import React, { useState, useContext, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

import ExpenseItem from "./ExpenseItem";
import TrackerContext from "../../context/tracker/trackerContext";

const AddExpense = () => {
  const trackerContext = useContext(TrackerContext);
  const { loading, addExpense, expenses, getExpenses } = trackerContext;

  const [expense, setExpense] = useState({
    reason: "",
    amount: "",
  });

  useEffect(() => {
    getExpenses();
    //eslint-disable-next-line
  }, []);

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
      const expense = {
        reason,
        amount: +amount,
        date: new Date(),
      };
      addExpense(expense);
      if (!loading) {
        M.toast({ html: "You can't spend more than your income!" });
      } else {
        M.toast({ html: `Expense of ${amount} has been added!` });
      }
      setExpense({
        reason: "",
        amount: "",
      });
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
      <ul className="collection with-header">
        <li className="collection-header center">Expense List</li>
        {!loading &&
          expenses !== null &&
          expenses.map((expense) => (
            <ExpenseItem expense={expense} key={expense.id} />
          ))}
      </ul>
    </div>
  );
};
export default AddExpense;
