import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Navbar } from './Navbar.js';
import { Reports } from './view/reports/Reports.js';
import { Home } from './view/Home.js';
import { Login } from './view/login.js';
import { Registration } from './view/Registration.js';
import { ReportView } from './view/reports/ReportView.js';
import { Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const Routing = () => {
  const [auth, setAuth] = useState(
    localStorage.getItem('JWT') ? true : false,
  );
  const login = () => {
    console.log(auth);
    setAuth(true);
  };
  const logout = () => {
    localStorage.clear();
    setAuth(false);
    history.push('/login');
  };
  return (
    <Router history={history}>
      <Navbar auth={auth} logout={logout}></Navbar>;
      <Route exact path="/" component={Home} />
      <Route exact path="/reports" component={Reports} />
      <Route path="/reports/week/:id" component={ReportView} />
      <Route
        path="/login"
        render={props => <Login {...props} login={login} />}
      />
      <Route path="/register" component={Registration} />
    </Router>
  );
};

ReactDOM.render(<Routing />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
