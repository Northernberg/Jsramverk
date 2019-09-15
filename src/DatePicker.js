import React, { useState } from 'react';
import {
  MenuItem,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 100,
  },
  menu: {
    width: 100,
    display: 'flex',
    flexWrap: 'wrap',
  },
  error: {
    color: 'red',
  },
}));

export const DatePicker = () => {
  const startDay = Array.from({ length: 30 }, (e, i) => ++i);
  const [dateValues, setValues] = useState({
    month: 'January',
    day: 1,
    year: 2019,
    days: startDay,
    valid: true,
  });
  const months = [
    {
      month: 'January',
      days: 31,
    },
    {
      month: 'February',
      days: 28,
    },
    {
      month: 'Mars',
      days: 31,
    },
    {
      month: 'April',
      days: 30,
    },
    {
      month: 'May',
      days: 31,
    },
    {
      month: 'June',
      days: 30,
    },
    {
      month: 'Juli',
      days: 31,
    },
    {
      month: 'August',
      days: 31,
    },
    {
      month: 'September',
      days: 30,
    },
    {
      month: 'Oktober',
      days: 31,
    },
    {
      month: 'November',
      days: 30,
    },
    {
      month: 'December',
      days: 31,
    },
  ];
  const years = Array.from({ length: 100 }, (e, i) => 2019 - i);
  const classes = useStyles();
  function handlingDays(event) {
    const target = event.target;

    const daysLen = months.filter(o => {
      return o.month === dateValues.month;
    });
    const amountDays = Array.from(
      { length: daysLen[0].days },
      (e, i) => ++i,
    );

    var isValid = true;
    var today = new Date();
    if (target.name === 'year') {
      isValid = today.getFullYear() - target.value > 18;
    }

    setValues({
      ...dateValues,
      [target.name]: target.value,
      days: amountDays,
      valid: isValid,
    });
  }
  console.log(dateValues);
  return (
    <Grid className={classes.container}>
      <TextField
        select
        label="Year"
        helperText="Year"
        margin="normal"
        name="year"
        value={dateValues.year}
        onChange={handlingDays}
        className={classes.textField}
      >
        {years.map(y => (
          <MenuItem className={classes.menu} key={y} value={y}>
            {y}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        helperText="Month"
        label="Month"
        name="month"
        margin="normal"
        value={dateValues.month}
        className={classes.textField}
        onChange={handlingDays}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
      >
        {months.map(m => (
          <MenuItem key={m.month} value={m.month}>
            {m.month}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Day"
        name="day"
        helperText="Day"
        margin="normal"
        className={classes.textField}
        onChange={handlingDays}
        value={dateValues.day}
      >
        {dateValues.hasOwnProperty('days') ? (
          dateValues.days.map(i => (
            <MenuItem key={i} value={i}>
              {i}
            </MenuItem>
          ))
        ) : (
          <MenuItem> Empty </MenuItem>
        )}
      </TextField>
      {!dateValues.valid && (
        <span className={classes.error}>You must be over 18.</span>
      )}
    </Grid>
  );
};
