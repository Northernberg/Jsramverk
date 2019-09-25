import React, { useState } from 'react';
import { Route, NavLink } from 'react-router-dom';
import {
  TextField,
  makeStyles,
  Button,
  Select,
  MenuItem,
} from '@material-ui/core';
import { ReportView } from './ReportView';
const amountWeeks = [1, 2, 3, 4, 5, 6];

const useStyles = makeStyles({
  textField: {
    width: '100%',
  },
});

export const Reports = ({ match }) => {
  const classes = useStyles();
  const [reportData, setReport] = useState({
    data: '',
    week: 1,
  });

  function handleReport(event) {
    const target = event.target;
    setReport({
      ...reportData,
      [target.name]: target.value,
    });
  }
  console.log(match.id);
  console.log(reportData);
  function handleSubmit(event) {
    event.preventDefault();
    fetch('https://me-api.onlinesoppa.me/reports', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(reportData), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(response =>
        console.log('Success:', JSON.stringify(response)),
      )
      .catch(error => console.error('Error:', error));
  }
  return (
    <div className="container">
      <h2> Reports </h2>
      <Route path={`${match.url}/week/:id`} component={ReportView} />
      <ul>
        <li>
          {amountWeeks.map(value => {
            return (
              <NavLink
                activeClassName="Active"
                key={value}
                to={`${match.url}/week/${value}`}
              >
                {' '}
                Week {value}{' '}
              </NavLink>
            );
          })}
        </li>
      </ul>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          variant="outlined"
          label="Create Report"
          multiline
          rows="20"
          margin="dense"
          onChange={handleReport}
          name="data"
        />
        <Select
          label="Create Report"
          name="week"
          value={reportData.week}
          onChange={handleReport}
        >
          {amountWeeks.map(w => (
            <MenuItem key={w} value={w}>
              {w}
            </MenuItem>
          ))}
        </Select>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};
