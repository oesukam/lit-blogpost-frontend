import { hot } from 'react-hot-loader';
import React from 'react';
import 'bulma/css/bulma.css';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Routes from './Routes';

const App = () => (
  <Router>
    <Routes />
  </Router>
);

export default hot(module)(App);
