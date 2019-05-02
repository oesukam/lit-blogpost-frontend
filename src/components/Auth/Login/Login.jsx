import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Login.scss';
import Input from '../../common/Input/Input';
import AvatarWhite from '../../../assets/svg/avatar-white.svg';
import {
  handleLoginInput,
  submitLogin,
  validateLoginInput,
  setLoginError,
} from '../../../actions/userActions';

export class Login extends Component {
  onSubmitForm = e => {
    e.preventDefault();
    const { submitLoginForm, loginForm, history, validateInput } = this.props;
    validateInput(loginForm).then(hasError => {
      if (!hasError) {
        submitLoginForm(loginForm).then(res => {
          if (res.status === 200) {
            history.push('/');
          }
        });
      }
    });
  };

  renderNotification = () => {
    const { loginError, clearError } = this.props;

    if (!loginError) return '';
    return (
      <div className="notification is-danger">
        <button className="delete" onClick={clearError} />
        {loginError}
      </div>
    );
  };

  render() {
    const { loginForm, loginFormError, loggingIn, handleInput } = this.props;
    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-3">
                <div className="auth-container">
                  <AvatarWhite className="avatar" />
                  <div className="error-container">
                    {this.renderNotification()}
                  </div>
                  <h1 className="title">Login</h1>
                  <form action="" onSubmit={this.onSubmitForm}>
                    <div className="field">
                      <p className="control has-icons-right">
                        <Input
                          name="email"
                          className={`input ${
                            loginFormError.email ? 'is-danger' : ''
                          }`}
                          type="email"
                          value={loginForm.email}
                          placeholder="Email"
                          onChange={handleInput}
                          required
                        />
                        <span className="icon is-small is-right">
                          <i className="fas fa-at" />
                        </span>
                      </p>
                    </div>
                    <div className="field">
                      <p className="control has-icons-right">
                        <Input
                          name="password"
                          className={`input ${
                            loginFormError.password ? 'is-danger' : ''
                          }`}
                          type="password"
                          placeholder="Password"
                          value={loginForm.password}
                          onChange={handleInput}
                          required
                        />
                        <span className="icon is-small is-right">
                          <i className="fas fa-lock" />
                        </span>
                      </p>
                    </div>
                    <button
                      data-el="login-btn"
                      onClick={this.onSubmitForm}
                      className={`button primary fill${
                        loggingIn ? ' is-loading' : ''
                      }`}
                    >
                      Login
                    </button>
                    <p className="has-text-centered">
                      Forgot
                      <span className="is-primary hover-cursor"> Password</span>
                      <span> ?</span>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  loginForm: PropTypes.object.isRequired,
  loginFormError: PropTypes.object.isRequired,
  loginError: PropTypes.string.isRequired,
  loggingIn: PropTypes.bool,
  submitLoginForm: PropTypes.func.isRequired,
  validateInput: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

Login.defaultProps = {
  loggingIn: false,
};

export const mapStateToProps = ({
  user: { loggingIn, loginForm, loginFormError, loginError },
}) => ({
  loggingIn,
  loginForm,
  loginFormError,
  loginError,
});

export const mapDispatchToProps = dispatch => ({
  handleInput: ({ target }) => dispatch(handleLoginInput(target)),
  submitLoginForm: payload => dispatch(submitLogin(payload)),
  validateInput: payload => dispatch(validateLoginInput(payload)),
  clearError: () => dispatch(setLoginError('')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
