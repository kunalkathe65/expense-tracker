import React, { useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

import IncomeItem from "./IncomeItem";

const AddMoney = () => {
  const [amount, setAmount] = useState("");

  const onChange = (e) => {
    setAmount(e.target.value);
  };
  const onSubmit = () => {
    if (amount === "") {
      M.toast({ html: "Amount can't be empty!" });
    } else {
      console.log(amount);
    }
  };
  const incomes = [
    {
      id: 1,
      amount: 5000,
    },
  ];
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
      {incomes.map((income) => (
        <IncomeItem income={income} key={income.id} />
      ))}
    </div>
  );
};
export default AddMoney;
