import React, { useContext, useEffect } from "react";

import TrackerContext from "../context/tracker/trackerContext";

const Dashboard = () => {
  const trackerContext = useContext(TrackerContext);
  const {
    totalIncome,
    loading,
    getTotalIncome,
    totalExpense,
    getTotalExpense,
  } = trackerContext;

  useEffect(() => {
    getTotalExpense();
    getTotalIncome();
    //eslint-disable-next-line
  }, [totalExpense, totalIncome]);

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
            Wallet <b className="green-text"> : {!loading && totalIncome} Rs</b>
          </h5>
        </li>
        <li className="collection-item">
          <h5>
            Expenses{" "}
            <b className="red-text"> : {!loading && totalExpense} Rs</b>
          </h5>
        </li>
      </ul>
    </div>
  );
};
export default Dashboard;
