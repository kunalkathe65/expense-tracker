import React, { useContext } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import M from "materialize-css/dist/js/materialize.min.js";

import TrackerContext from "../../context/tracker/trackerContext";

const ExpenseItem = ({ expense }) => {
  const { id, reason, amount, date } = expense;

  const trackerContext = useContext(TrackerContext);
  const { deleteExpense } = trackerContext;

  const onDelete = () => {
    deleteExpense(amount, id);
    M.toast({ html: `Expense of ${amount} id deleted!!` });
  };

  return (
    <li className="collection-item">
      <div>
        <span>
          <span>
            Spent{" "}
            <span className="red-text">
              {amount}Rs{" "}
              <span className="grey-text">
                on <Moment format="DD/MM/YYYY hh:mm">{date}</Moment>
              </span>
            </span>
          </span>
          <br />
          <span className="black-text">{reason}</span>
        </span>
        <a href="!#" className="secondary-content" onClick={onDelete}>
          <i className="material-icons" style={{ color: "red" }}>
            remove_circle_outline
          </i>
        </a>
      </div>
    </li>
  );
};

ExpenseItem.propTypes = {
  expense: PropTypes.object.isRequired,
};
export default ExpenseItem;
