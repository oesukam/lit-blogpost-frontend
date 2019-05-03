import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/green-leaves.png';
import './TopNav.scss';

export class TopNav extends Component {
  state = {
    url: '',
    hamburger: false,
  };

  componentWillReceiveProps({ match: { url } }) {
    this.setState({ url });
  }

  toggleHambuger = () => {
    const { hamburger } = this.state;
    this.setState({ hamburger: !hamburger });
  };

  renderAuthNav = () => {
    const { url } = this.state;
    const { isAuth, user } = this.props;
    if (isAuth)
      return <img className="user-avatar" src={user.image} alt="User avatar" />;
    return (
      <div className="buttons">
        <Link
          to="/login"
          className={`button ${url === '/login' ? 'is-primary' : 'is-light'}`}
        >
          Log in
        </Link>
      </div>
    );
  };

  render() {
    const { hamburger } = this.state;
    return (
      <nav
        id="top-navbar"
        className="navbar"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img src={logo} width="50" height="40" alt="Brand logo" />
            </Link>
            <button
              data-el="hamburger"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              onClick={this.toggleHambuger}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>

          <div className={`navbar-menu ${hamburger ? 'is-active' : ''}`}>
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Home
              </Link>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">{this.renderAuthNav()}</div>
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
