import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const IncomeItem = ({ income }) => {
  const { amount, date } = income;
  return (
    <ul className="collection with-header">
      <li className="collection-header center">Added Income List</li>
      <li className="collection-item">
        <div>
          <span>
            <span className="green-text">
              {amount}Rs added on{" "}
              <span className="grey-text">
                <Moment format="DD/MM/YYYY">{date}</Moment>
              </span>
            </span>
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

IncomeItem.propTypes = {
  income: PropTypes.object.isRequired,
};
export default IncomeItem;
