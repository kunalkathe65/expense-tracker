import React from "react";

const Dashboard = () => {
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
            Income <b className="green-text"> : 5000 Rs</b>
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
