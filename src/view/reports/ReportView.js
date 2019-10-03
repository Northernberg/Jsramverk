import React, { useState, useEffect } from 'react';
import { MarkdownParser } from '../../Markdown.js';
import { Button, TextField, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  textField: {
    width: '100%',
  },
});

export const ReportView = ({ match }) => {
  const classes = useStyles();
  const [textData, setText] = useState({
    data: '',
    showEditor: false,
    week: match.params.id,
    empty: false,
  });
  const handleReport = event => {
    setText({
      ...textData,
      data: event.target.value,
    });
  };
  const onEdit = event => {
    event.preventDefault();
    console.log('yo');
    setText({
      ...textData,
      showEditor: !event.target.value,
    });
  };
  const handleSubmit = event => {
    event.preventDefault();
    fetch(process.env.REACT_APP_API_ENDPOINT + '/reports/update', {
      method: 'POST', // or 'PUT',
      body: JSON.stringify(textData),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('JWT'),
      },
    })
      .then(res => res.json())
      .then(response => {
        console.log(JSON.stringify(response));
        if (response.ok) {
          setText({
            ...textData,
            data: response.data,
          });
        }
      })
      .catch(error => console.error('Error:', error));
  };
  useEffect(() => {
    fetch(
      process.env.REACT_APP_API_ENDPOINT +
        '/reports/week/' +
        match.params.id,
      {
        method: 'GET', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('JWT'),
        },
      },
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          setText({
            data: '',
            empty: true,
          });
          throw new Error('Report is empty');
        }
      })
      .then(response => {
        console.log(JSON.stringify(response));
        setText({
          week: match.params.id,
          data: response.data,
        });
      })
      .catch(error => console.error('Error:', error));
  }, [match.params.id]);
  return (
    <div class="reportInfo">
      <h1> Week {match.params.id}</h1>
      <MarkdownParser content={textData.data}></MarkdownParser>
      {textData.showEditor && (
        <form>
          <TextField
            className={classes.textField}
            variant="outlined"
            label="Create Report"
            multiline
            rows="20"
            margin="dense"
            onChange={handleReport}
            name="data"
            value={textData.data}
          ></TextField>
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </form>
      )}
      {textData.empty ? (
        <NavLink to="/reports">
          {' '}
          Report is empty. Go back and create report.{' '}
        </NavLink>
      ) : (
        <Button
          onClick={onEdit}
          type="submit"
          variant="contained"
          color="primary"
        >
          Update
        </Button>
      )}
    </div>
  );
};
