import React, { useReducer } from "react";

import IncomeContext from "./incomeContext";
import incomeReducer from "./incomeReducer";
import {
  GET_TOTAL_INCOME,
  ADD_INCOME,
  ERROR,
  SET_LOADING,
  ADD_TO_TOTAL_INCOME,
  GET_INCOMES,
  DELETE_INCOME,
} from "../types";

const IncomeState = (props) => {
  const initialState = {
    totalIncome: 0,
    loading: false,
    errors: null,
    income: [],
  };

  const [state, dispatch] = useReducer(incomeReducer, initialState);

  //Actions

  //Get Total Income
  const getTotalIncome = async () => {
    try {
      setLoading();
      const res = await fetch("http://localhost:5000/totalIncome");
      const data = await res.json();
      dispatch({
        type: GET_TOTAL_INCOME,
        payload: data.totalIncome,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.data,
      });
    }
  };

  //Get incomes
  const getIncomes = async () => {
    try {
      setLoading();
      const res = await fetch("http://localhost:5000/incomes");
      const data = await res.json();
      dispatch({
        type: GET_INCOMES,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.data,
      });
    }
  };

  //Add to Total Income
  const updateTotalIncome = async (amount, type) => {
    try {
      setLoading();
      const res = await fetch("http://localhost:5000/totalIncome");
      const data = await res.json();
      let newAmount = 0;
      if (type === "increment") {
        newAmount = data.totalIncome + amount;
      } else {
        newAmount = data.totalIncome - amount;
      }

      const newTotalIncome = {
        id: 1,
        totalIncome: newAmount,
      };

      const response = await fetch("http://localhost:5000/totalIncome", {
        method: "PUT",
        body: JSON.stringify(newTotalIncome),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newData = await response.json();

      dispatch({
        type: ADD_TO_TOTAL_INCOME,
        payload: newData.totalIncome,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.data,
      });
    }
  };

  //Add income
  const addIncome = async (income) => {
    try {
      setLoading();
      const res = await fetch("http://localhost:5000/incomes", {
        method: "POST",
        body: JSON.stringify(income),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      updateTotalIncome(data.amount, "increment");
      dispatch({
        type: ADD_INCOME,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err,
      });
    }
  };

  //Delete Income
  const deleteIncome = async (amount, id) => {
    try {
      setLoading();
      await fetch(`http://localhost:5000/incomes/${id}`, {
        method: "DELETE",
      });
      updateTotalIncome(amount, "decrement");
      dispatch({
        type: DELETE_INCOME,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err,
      });
    }
  };

  //Set Loading to true
  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  return (
    <IncomeContext.Provider
      value={{
        totalIncome: state.totalIncome,
        loading: state.loading,
        income: state.income,
        error: state.error,
        getTotalIncome,
        addIncome,
        deleteIncome,
        getIncomes,
      }}
    >
      {props.children}
    </IncomeContext.Provider>
  );
};

export default IncomeState;
