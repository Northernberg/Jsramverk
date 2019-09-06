import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Reports from "./view/reports/reports.js";
import Home from "./view/home.js"
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/reports/week">Reports</Link>
        </li>
      </ul>
      <Route exact path="/" component={Home} />
      <Route path="/reports/week" component={Reports} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
