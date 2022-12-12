import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editAction, updateExpenseAction } from '../actions';

class Table extends Component {
  onDelebuttonClick = (id) => {
    const { expenses, removeExpense } = this.props;
    const updatedArray = expenses.filter((expense) => expense.id !== id);

    removeExpense(updatedArray);
  }

  render() {
    const { expenses, enableEdit } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {
            expenses.map((expense) => {
              const { id, description, tag, method, value, currency } = expense;
              const { exchangeRates: { [currency]: { name, ask } } } = expense;
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{name}</td>
                  <td>{Number(ask).toFixed(2)}</td>
                  <td>{Number((value * ask)).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => enableEdit(expense) }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.onDelebuttonClick(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </thead>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (state) => dispatch(updateExpenseAction(state)),
  enableEdit: (state) => dispatch(editAction(state)) });

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  removeExpense: PropTypes.func.isRequired,
  enableEdit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
