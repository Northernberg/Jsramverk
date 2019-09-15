import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import Week1 from './Week1.js';
import Week2 from './Week2.js';
import Week3 from './Week3.js';
import Week4 from './Week4.js';
import Week5 from './Week5.js';
import Week6 from './Week6.js';
const amountWeeks = [1, 2, 3, 4, 5, 6];

function Reports({ match }) {
  return (
    <div className="container">
      <h2> Reports </h2>
      <ul>
        <li>
          {amountWeeks.map(value => {
            return (
              <NavLink
                activeClassName="Active"
                key={value}
                to={`${match.url}/${value}`}
              >
                {' '}
                Week {value}{' '}
              </NavLink>
            );
          })}
        </li>
      </ul>
      <Route path={`${match.url}/1`} component={Week1} />
      <Route path={`${match.url}/2`} component={Week2} />
      <Route path={`${match.url}/3`} component={Week3} />
      <Route path={`${match.url}/4`} component={Week4} />
      <Route path={`${match.url}/5`} component={Week5} />
      <Route path={`${match.url}/6`} component={Week6} />
    </div>
  );
}
export default Reports;
