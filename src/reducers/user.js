const INITIAL_STATE = {
  email: '',
  editStatus: false,
  editExpense: {},
};

const user = (state = INITIAL_STATE, action) => {
  const { editExpense } = action;
  switch (action.type) {
  case 'SAVE':
    return { ...state, email: action.state.email };
  case 'EDIT_STATUS':
    return { ...state, editStatus: true, editExpense };
  case 'DISABLE':
    return { ...state, editStatus: false, editExpense: {} };
  default:
    return state;
  }
};

export default user;
