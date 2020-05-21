import React, { useContext, useEffect } from "react";

import IncomeContext from "../context/income/incomeContext";

const Dashboard = () => {
  const incomeContext = useContext(IncomeContext);
  const { totalIncome, loading, getTotalIncome } = incomeContext;

  useEffect(() => {
    getTotalIncome();
    //eslint-disable-next-line
  }, []);

  return (
    <div style={{ marginTop: "5%" }}>
      <ul className="collection with-header">
        <li className="collection-header center indigo">
          <h4 className="white-text">
            <i className="material-icons medium">monetization_on</i>
            <br />
            Expense Tracker
          </h4>
        </li>
        <li className="collection-item">
          <h5>
            Income <b className="green-text"> : {!loading && totalIncome} Rs</b>
          </h5>
        </li>
        <li className="collection-item">
          <h5>
            Expenses <b className="red-text"> : 3000 Rs</b>
          </h5>
        </li>
        <li className="collection-item">
          <h5>
            Remaining <b className="blue-text"> : 2000 Rs</b>
          </h5>
        </li>
      </ul>
    </div>
  );
};
export default Dashboard;
