const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: null,
};

const mapData = (obj) => {
  const entriesArray = Object.keys(obj);
  return entriesArray.filter((currencies) => currencies !== 'USDT');
};

const wallet = (state = INITIAL_STATE, action) => {
  const { currenciesObj = {}, expense = {}, expenses = [] } = action;
  switch (action.type) {
  case 'GET_CRR':
    return { ...state, currencies: mapData(currenciesObj) };
  case 'FAILED_REQUEST':
    return { ...state, error: action.error };
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, expense],
    };
  case 'UPDATE_EXPENSES':
    return {
      ...state,
      expenses,
    };
  default:
    return state;
  }
};

export default wallet;
