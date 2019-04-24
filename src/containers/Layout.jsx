import React from 'react';
import PropTypes from 'prop-types';
import TopNav from '../components/TopNav/TopNav';

const Layout = ({ childreen, match }) => (
  <div>
    <TopNav match={match} />
    <div className="main-content">{childreen}</div>
  </div>
);

Layout.propTypes = {
  childreen: PropTypes.any,
  match: PropTypes.any,
};

Layout.defaultProps = {
  childreen: '',
  match: { params: {} },
};

export default Layout;
