export const SAVE = 'SAVE';
export const GET_CRR = 'GET_CRR';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const EDIT_STATUS = 'EDIT_STATUS';
export const DISABLE = 'DISABLE';
export const FOOD = 'Alimentação';

export const saveDataAction = (state) => ({ type: SAVE, state });
export const editAction = (editExpense) => ({ type: EDIT_STATUS, editExpense });
export const disableAction = () => ({ type: DISABLE });

const getCurrencies = (currenciesObj) => ({ type: GET_CRR, currenciesObj });
const getFail = (error) => ({ type: FAILED_REQUEST, error });
const addExpenseAction = (expense) => ({ type: ADD_EXPENSE, expense });
export const updateExpenseAction = (expenses) => ({ type: UPDATE_EXPENSES, expenses });

export const fetchCurrencies = (expense, isForExpense = false) => (
  async (dispatch) => {
    try {
      const resolve = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await resolve.json();
      if (isForExpense) dispatch(addExpenseAction({ ...expense, exchangeRates: data }));
      else dispatch(getCurrencies(data));
    } catch (error) {
      dispatch(getFail(error));
    }
  }
);
