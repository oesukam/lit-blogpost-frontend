import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Home from './Home/Home';
import Login from './Auth/Login/Login';

export const Routes = ({ isAuth }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route
      exact
      path="/login"
      render={props => (!isAuth ? <Login {...props} /> : <Redirect to="/" />)}
    />
  </Switch>
);

Routes.propTypes = {
  isAuth: PropTypes.bool,
};

Routes.defaultProps = {
  isAuth: false,
};

export const mapStateToProps = ({ user: { isAuth } }) => ({
  isAuth,
});

export default connect(mapStateToProps)(Routes);
