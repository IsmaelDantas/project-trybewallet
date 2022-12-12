import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveDataAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  } // lint

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }));
  }

  onButtonClick = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { saveData, history } = this.props;
    saveData({ email });
    history.push('/carteira');
  }

  /* verificação de e-mail sugerida pelo Caio Galvão na seguinte thread:
  https://trybecourse.slack.com/team/U02U0142BAR */

  dataValidation = () => {
    const { email, password } = this.state;
    const minLength = 6;
    const isPasswordValid = password.length >= minLength;
    const re = /\S+@\S+\.\S+/;
    const isEmailValid = re.test(email);
    return !(isEmailValid && isPasswordValid);
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              value={ email }
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="senha">
            Senha:
            <input
              type="text"
              id="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
              data-testid="password-input"
            />
          </label>
          <button
            type="submit"
            disabled={ this.dataValidation() }
            onClick={ this.onButtonClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveData: (state) => dispatch(saveDataAction(state)) });

Login.propTypes = {
  saveData: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
