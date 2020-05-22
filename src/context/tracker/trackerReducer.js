import {
  GET_TOTAL_INCOME,
  SET_LOADING,
  ERROR,
  ADD_INCOME,
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
    case UPDATE_INCOME:
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
    case GET_EXPENSES:
      return {
        ...state,
        loading: false,
        expenses: action.payload,
      };
    case GET_TOTAL_EXPENSE:
      return {
        ...state,
        loading: false,
        totalExpense: action.payload,
      };
    case ADD_EXPENSE:
      return {
        ...state,
        loading: false,
        expenses: [...state.expenses, action.payload_1],
        totalIncome: action.payload_2,
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((i) => i.id !== action.payload_1),
        totalIncome: action.payload_2,
        loading: false,
      };
    case UPDATE_EXPENSE:
      return {
        ...state,
        loading: false,
        totalExpense: action.payload,
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
    case CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case EXPENSE_ERROR:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
