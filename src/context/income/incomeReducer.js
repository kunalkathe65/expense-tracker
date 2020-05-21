import {
  GET_TOTAL_INCOME,
  SET_LOADING,
  ERROR,
  ADD_INCOME,
  ADD_TO_TOTAL_INCOME,
  GET_INCOMES,
  DELETE_INCOME,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_TOTAL_INCOME:
      return {
        ...state,
        loading: false,
        totalIncome: action.payload,
      };
    case ADD_INCOME:
      return {
        ...state,
        income: [...state.income, action.payload],
        loading: false,
      };
    case ADD_TO_TOTAL_INCOME:
      return {
        ...state,
        loading: false,
        totalIncome: action.payload,
      };
    case GET_INCOMES:
      return {
        ...state,
        loading: false,
        income: action.payload,
      };
    case DELETE_INCOME:
      return {
        ...state,
        income: state.income.filter((i) => i.id !== action.payload),
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
