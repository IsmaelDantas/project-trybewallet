import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Form from '../Components/Form';
import { fetchCurrencies } from '../actions';
import Table from '../Components/Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  updateTotal = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, expense) => {
      const { exchangeRates, currency, value } = expense;
      const currencyQuote = exchangeRates[currency].ask;
      return acc + (value * currencyQuote);
    }, 0);
    if (total === undefined) return 0;
    return Number(total.toFixed(2));
  };

  render() {
    const { email } = this.props;
    return (
      <div>

        <header>
          <span data-testid="email-field">{email}</span>
          <div>
            Despesa Total:
            <span data-testid="total-field">{this.updateTotal()}</span>
            <span data-testid="header-currency-field"> BRL</span>
          </div>
        </header>
        <Form />
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()) });

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
