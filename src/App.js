import React, { useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import "./App.css";
import Dashboard from "./components/Dashboard";
import AddMoney from "./components/addmoney/AddMoney";
import AddExpense from "./components/expenses/AddExpense";
import ClearAllBtn from "./components/ClearAllBtn";
import TrackerState from "./context/tracker/TrackerState";

function App() {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <TrackerState>
      <div className="container">
        <div className="row">
          <div className="col s12">
            <Dashboard />
            <AddMoney />
            <AddExpense />
            <ClearAllBtn />
          </div>
        </div>
      </div>
    </TrackerState>
  );
}

export default App;
