import React from "react";
import { Route, NavLink} from "react-router-dom";
import Week1 from "./week1.js";
import Week2 from "./week2.js";
import Week3 from "./week3.js";
import Week4 from "./week4.js";
import Week5 from "./week5.js";
import Week6 from "./week6.js";
const amountWeeks = [1,2,3,4,5,6];

function Reports({match}) {
  return (
    <div class="container">
      <h2> Reports </h2>
      <ul>
        <li>
          {amountWeeks.map((value) => {
            return  <NavLink activeClassName='Active' to={`${match.url}/${value}`}> Week {value} </NavLink>
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
  )
}
export default Reports;

 