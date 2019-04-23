import { hot } from "react-hot-loader";
import React from "react";
import "./App.scss";
import "bulma/css/bulma.css";

export const App = () => (
  <div className="container">
    <i class="fas fa-users" />
  </div>
);

export default hot(module)(App);
