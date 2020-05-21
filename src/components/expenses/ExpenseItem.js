import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ExpenseItem = ({ expense }) => {
  const { reason, amount, date } = expense;
  return (
    <ul className="collection with-header">
      <li className="collection-header center">Expense List</li>
      <li className="collection-item">
        <div>
          <span>
            <span>
              Spent{" "}
              <span className="red-text">
                {amount}Rs{" "}
                <span className="grey-text">
                  on <Moment format="DD/MM/YYYY">{date}</Moment>
                </span>
              </span>
            </span>
            <br />
            <span className="black-text">{reason}</span>
          </span>
          <a href="!#" className="secondary-content">
            <i className="material-icons" style={{ color: "red" }}>
              remove_circle_outline
            </i>
          </a>
        </div>
      </li>
    </ul>
  );
};

ExpenseItem.propTypes = {
  expense: PropTypes.object.isRequired,
};
export default ExpenseItem;
