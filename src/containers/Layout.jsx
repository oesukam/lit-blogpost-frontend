import React from 'react';
import PropTypes from 'prop-types';
import TopNav from '../components/TopNav/TopNav';

const Layout = ({ children, match }) => (
  <div>
    <TopNav match={match} />
    <div className="main-content">{children}</div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.any,
  match: PropTypes.any,
};

Layout.defaultProps = {
  children: '',
  match: { params: {} },
};

export default Layout;
