import React, { useContext } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import M from "materialize-css/dist/js/materialize.min.js";

import TrackerContext from "../../context/tracker/trackerContext";

const IncomeItem = ({ income }) => {
  const trackerContext = useContext(TrackerContext);
  const { deleteIncome } = trackerContext;

  const { id, amount, date } = income;

  const onDelete = () => {
    deleteIncome(amount, id);
    M.toast({ html: `Income of ${amount} has been deleted!` });
  };

  return (
    <li className="collection-item">
      <div>
        <span>
          <span className="green-text">
            {amount}Rs added on{" "}
            <span className="grey-text">
              <Moment format="DD/MM/YYYY hh:mm">{date}</Moment>
            </span>
          </span>
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

IncomeItem.propTypes = {
  income: PropTypes.object.isRequired,
};
export default IncomeItem;
