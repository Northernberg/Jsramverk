import React, { useState } from 'react';
import { DatePicker } from '../DatePicker.js';
import { Redirect } from 'react-router-dom';
import {
  Button,
  TextField,
  makeStyles,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  textField: {
    maxWidth: 200,
  },
  menu: {
    width: 100,
    display: 'flex',
    flexWrap: 'wrap',
  },
  form: {
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
  },
  error: {
    color: 'red',
  },
}));

export const Registration = () => {
  const classes = useStyles();
  const [formValues, setValues] = useState({
    firstname: '',
    lastname: '',
    password: '',
    email: '',
    redirect: false,
    errors: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
  });
  function renderRedirect(event) {
    console.log(formValues);

    event.preventDefault();
    let valid = true;

    valid =
      formValues.firstname.length > 0 &&
      formValues.lastname.length > 0 &&
      formValues.email.length > 0 &&
      formValues.password.length > 0;

    Object.values(formValues.errors).forEach(
      val => val.length > 0 && (valid = false),
    );

    setValues({
      ...formValues,
      redirect: valid,
    });
  }
  function validateInput(event) {
    const target = event.target;
    let errors = formValues.errors;
    switch (target.name) {
      case 'firstname':
        errors.firstname =
          target.value.length < 5
            ? 'First Name must be 5 characters long!'
            : '';
        break;

      case 'lastname':
        errors.lastname =
          target.value.length < 5
            ? 'Last Name must be 5 characters long!'
            : '';
        break;

      case 'email':
        errors.email =
          target.value.includes('@') && target.value.length > 10
            ? ''
            : 'Email is not valid!';
        break;
      case 'password':
        errors.password =
          target.value.length < 8
            ? 'Password must be 8 characters long!'
            : '';
        break;
      default:
        break;
    }
    setValues({
      ...formValues,
      [target.name]: target.value,
      errors,
    });
  }
  console.log(formValues);
  if (formValues.redirect) {
    console.log(formValues);

    return <Redirect to="/" />;
  }
  return (
    <div className="container">
      <h1>Registration</h1>
      <form className={classes.form}>
        <Grid className={classes.container}>
          <TextField
            label="Firstname"
            name="firstname"
            margin="normal"
            className={classes.textField}
            value={formValues.firstname}
            onChange={validateInput}
            required
          ></TextField>
          <TextField
            label="Lastname"
            name="lastname"
            margin="normal"
            className={classes.textField}
            value={formValues.lastname}
            onChange={validateInput}
            required
          ></TextField>
        </Grid>
        <TextField
          label="Email"
          name="email"
          margin="normal"
          type="email"
          className={classes.textField}
          value={formValues.email}
          onChange={validateInput}
          required
        ></TextField>
        <TextField
          label="Password"
          name="password"
          margin="normal"
          type="password"
          className={classes.textField}
          value={formValues.password}
          onChange={validateInput}
          required
        ></TextField>
        <DatePicker></DatePicker>
        <Button
          variant="contained"
          color="primary"
          className={classes.textField}
          onClick={renderRedirect}
          type="submit"
        >
          Submit
        </Button>
        {formValues.errors.firstname.length > 0 && (
          <span className={classes.error}>
            {formValues.errors.firstname}
          </span>
        )}
        {formValues.errors.lastname.length > 0 && (
          <span className={classes.error}>
            {formValues.errors.lastname}
          </span>
        )}
        {formValues.errors.password.length > 0 && (
          <span className={classes.error}>
            {formValues.errors.password}
          </span>
        )}
        {formValues.errors.email.length > 0 && (
          <span className={classes.error}>
            {formValues.errors.email}
          </span>
        )}
      </form>
    </div>
  );
};
