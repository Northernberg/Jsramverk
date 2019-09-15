import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  NavLink,
  BrowserRouter as Router,
} from 'react-router-dom';
import Reports from './view/reports/Reports.js';
import Home from './view/Home.js';
import { Registration } from './view/Registration.js';
import './index.css';
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <div>
      <ul className="navbar">
        <li>
          <NavLink exact activeClassName="Active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="Active" to="/reports/week">
            Reports
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="Active" to="/registration">
            Registration
          </NavLink>
        </li>
      </ul>
      <Route exact path="/" component={Home} />
      <Route path="/reports/week" component={Reports} />
      <Route path="/registration" component={Registration} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
