import React, { useState, useContext, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

import IncomeItem from "./IncomeItem";
import TrackerContext from "../../context/tracker/trackerContext";

const AddMoney = () => {
  const trackerContext = useContext(TrackerContext);
  const { income, loading, addIncome, getIncomes } = trackerContext;

  useEffect(() => {
    getIncomes();
    //eslint-disable-next-line
  }, []);

  const [amount, setAmount] = useState("");

  const onChange = (e) => {
    setAmount(e.target.value);
  };

  const onSubmit = () => {
    if (amount === "") {
      M.toast({ html: "Amount can't be empty!" });
    } else {
      const income = {
        amount: +amount,
        date: new Date(),
      };
      addIncome(income);
      M.toast({ html: `Income of ${amount} has been added!` });
    }
    setAmount("");
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Add Money"
        name="money"
        value={amount}
        onChange={onChange}
      />
      <button
        type="button"
        className="waves-effect waves-light btn-small green"
        onClick={onSubmit}
      >
        <i className="material-icons left">add_circle</i>
        Add
      </button>
      <ul className="collection with-header">
        <li className="collection-header center">Income List</li>
        {!loading &&
          income !== null &&
          income.map((income) => (
            <IncomeItem income={income} key={income.id} />
          ))}
      </ul>
    </div>
  );
};
export default AddMoney;
