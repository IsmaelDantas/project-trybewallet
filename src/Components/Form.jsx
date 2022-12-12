import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, updateExpenseAction, disableAction, FOOD } from '../actions';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: FOOD,
      description: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }));
  }

  onSaveButtonClick =(event) => {
    event.preventDefault();
    const { value, currency, method, tag, description } = this.state;
    const { addExpense, expenses, updateExpenses } = this.props;
    const id = expenses.length;
    const brokenList = expenses.some((expense) => expense.id === id);
    if (brokenList) {
      const reorderedExpenses = expenses.map((e, index) => ({ ...e, id: index }));
      updateExpenses(reorderedExpenses);
    }
    const expenseObj = { id, value, currency, method, tag, description };
    addExpense(expenseObj, true);

    this.setState({
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: FOOD,
      description: '',
    });
  }

  onEditButtonClick = (event) => {
    event.preventDefault();
    const { value, currency, method, tag, description } = this.state;
    const { expenses, updateExpenses, disableStatus, editExpense } = this.props;
    const updatedExpenses = expenses.map((expense) => {
      if (expense.id === editExpense.id) {
        return {
          ...expense,
          value,
          currency,
          method,
          tag,
          description,
        };
      }
      return expense;
    });
    updateExpenses(updatedExpenses);
    disableStatus();
    this.setState({
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: FOOD,
      description: '',
    });
  }

  render() {
    const { currencies, editStatus } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            value={ value }
            id="value"
            onChange={ this.handleChange }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            data-testid="currency-input"
          >
            {currencies.map((curr, index) => (
              <option key={ index } value={ curr }>
                {curr}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de Pagamento:
          <select
            id="method"
            name="method"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            id="tag"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Sáude">Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        { editStatus ? (
          <button type="submit" onClick={ this.onEditButtonClick }>
            Editar despesa
          </button>
        ) : (
          <button type="submit" onClick={ this.onSaveButtonClick }>
            Adicionar despesa
          </button>)}
      </form>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  addExpense: PropTypes.func.isRequired,
  updateExpenses: PropTypes.func.isRequired,
  disableStatus: PropTypes.func.isRequired,
  editStatus: PropTypes.bool,
  editExpense: PropTypes.objectOf(PropTypes.shape),
};

Form.defaultProps = {
  editStatus: false,
  editExpense: {},
};

const mapDispatchToProps = (dispatch) => ({
  addExpense: (state, bool) => dispatch(fetchCurrencies(state, bool)),
  updateExpenses: (state) => dispatch(updateExpenseAction(state)),
  disableStatus: () => dispatch(disableAction()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editStatus: state.user.editStatus,
  editExpense: state.user.editExpense,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
