import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../containers/Layout';

export const Home = ({ match }) => (
  <Layout match={match}>Home Component</Layout>
);

Home.propTypes = {
  match: PropTypes.any,
};

Home.defaultProps = {
  match: {},
};

export default Home;
