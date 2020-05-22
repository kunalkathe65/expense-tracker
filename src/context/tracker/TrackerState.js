import React, { useReducer } from "react";

import TrackerContext from "./trackerContext";
import trackerReducer from "./trackerReducer";
import {
  GET_TOTAL_INCOME,
  ADD_INCOME,
  ERROR,
  SET_LOADING,
  UPDATE_INCOME,
  GET_INCOMES,
  DELETE_INCOME,
  GET_EXPENSES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  UPDATE_EXPENSE,
  GET_TOTAL_EXPENSE,
  EXPENSE_ERROR,
  CLEAR_ERROR,
} from "../types";

const TrackerState = (props) => {
  const initialState = {
    totalIncome: 0,
    totalExpense: 0,
    loading: false,
    errors: null,
    income: [],
    expenses: [],
  };

  const [state, dispatch] = useReducer(trackerReducer, initialState);

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
        payload: err,
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
        payload: err,
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
        type: UPDATE_INCOME,
        payload: newData.totalIncome,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err,
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

  //Get Total Expense
  const getTotalExpense = async () => {
    try {
      setLoading();
      const res = await fetch("http://localhost:5000/totalExpense");
      const data = await res.json();
      dispatch({
        type: GET_TOTAL_EXPENSE,
        payload: data.totalExpense,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err,
      });
    }
  };

  //Get expenses
  const getExpenses = async () => {
    try {
      setLoading();
      const res = await fetch("http://localhost:5000/expenses");
      const data = await res.json();
      dispatch({
        type: GET_EXPENSES,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err,
      });
    }
  };

  //Add to Total Expense
  const updateTotalExpense = async (amount, type) => {
    try {
      setLoading();
      const res = await fetch("http://localhost:5000/totalExpense");
      const data = await res.json();
      let newAmount = 0;
      if (type === "increment") {
        newAmount = data.totalExpense + amount;
      } else {
        newAmount = data.totalExpense - amount;
      }

      const newTotalExpense = {
        id: 1,
        totalExpense: newAmount,
      };

      const response = await fetch("http://localhost:5000/totalExpense", {
        method: "PUT",
        body: JSON.stringify(newTotalExpense),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newData = await response.json();

      dispatch({
        type: UPDATE_EXPENSE,
        payload: newData.totalExpense,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err,
      });
    }
  };

  //Add expense
  const addExpense = async (expense) => {
    try {
      setLoading();

      //updating total income
      const response_1 = await fetch("http://localhost:5000/totalIncome");
      const oldData = await response_1.json();

      //checking if expend amt is not more than income amt
      if (expense.amount > oldData.totalIncome) {
        dispatch({
          type: EXPENSE_ERROR,
          payload: "You can't spend more than your income!",
        });
      } else {
        const res = await fetch("http://localhost:5000/expenses", {
          method: "POST",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        //updating total expense
        updateTotalExpense(data.amount, "increment");

        let newAmount = oldData.totalIncome - data.amount;
        //updating new Total Income
        const newIncome = {
          id: 1,
          totalIncome: newAmount,
        };
        //updating total income
        const response_2 = await fetch("http://localhost:5000/totalIncome", {
          method: "PUT",
          body: JSON.stringify(newIncome),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const newData = await response_2.json();

        dispatch({
          type: ADD_EXPENSE,
          payload_1: data,
          payload_2: newData.totalIncome,
        });
      }
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err,
      });
    }
  };

  //Delete Expense
  const deleteExpense = async (amount, id) => {
    try {
      setLoading();
      await fetch(`http://localhost:5000/expenses/${id}`, {
        method: "DELETE",
      });
      updateTotalExpense(amount, "decrement");
      //updating total income
      const response_1 = await fetch("http://localhost:5000/totalIncome");
      const oldData = await response_1.json();

      let newAmount = oldData.totalIncome + amount;

      //updating new Total Income
      const newIncome = {
        id: 1,
        totalIncome: newAmount,
      };
      //updating total income
      const response_2 = await fetch("http://localhost:5000/totalIncome", {
        method: "PUT",
        body: JSON.stringify(newIncome),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newData = await response_2.json();
      dispatch({
        type: DELETE_EXPENSE,
        payload_1: id,
        payload_2: newData.amount,
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

  //Clear Errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };

  return (
    <TrackerContext.Provider
      value={{
        totalIncome: state.totalIncome,
        totalExpense: state.totalExpense,
        loading: state.loading,
        income: state.income,
        expenses: state.expenses,
        errors: state.errors,
        getTotalIncome,
        addIncome,
        deleteIncome,
        getIncomes,
        getExpenses,
        addExpense,
        deleteExpense,
        getTotalExpense,
        clearErrors,
      }}
    >
      {props.children}
    </TrackerContext.Provider>
  );
};

export default TrackerState;
