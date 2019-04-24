import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/green-leaves.png';
import './TopNav.scss';

export class TopNav extends Component {
  state = {
    url: '',
  };

  componentWillReceiveProps({ match: { url } }) {
    this.setState({ url });
  }

  render() {
    const { url } = this.state;
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img src={logo} width="50" height="40" alt="Brand logo" />
            </Link>
            <button className="navbar-burger burger" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>

          <div className="navbar-menu">
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Home
              </Link>

              <Link to="/posts" className="navbar-item">
                Posts
              </Link>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Link
                    to="/auth/signup"
                    className={`button ${url === '/auth/signup' ? 'is-primary' : 'is-light'}`}
                  >
                    <strong>Sign up</strong>
                  </Link>
                  <Link
                    to="/auth/login"
                    className={`button ${url === '/auth/login' ? 'is-primary' : 'is-light'}`}
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

TopNav.propTypes = {
  user: PropTypes.object,
  isAuth: PropTypes.bool,
  match: PropTypes.object,
};

TopNav.defaultProps = {
  user: {},
  isAuth: false,
  match: { url: '' },
};

export const mapStateToProps = ({ user: { user, isAuth } }) => ({
  user,
  isAuth,
});

export default connect(mapStateToProps)(TopNav);
