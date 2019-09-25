import React, { useState, useEffect } from 'react';
import { MarkdownParser } from '../../Markdown.js';
import { Button, TextField, makeStyles } from '@material-ui/core';

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
    console.log('yo');
    console.log(textData);
    fetch('https://me-api.onlinesoppa.me/reports/update', {
      method: 'POST', // or 'PUT',
      body: JSON.stringify(textData),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('JWT'),
      },
    })
      .then(res => res.json())
      .then(response => {
        console.log('Success:', JSON.stringify(response));
        setText({
          ...textData,
          data: response.data,
        });
      })
      .catch(error => console.error('Error:', error));
  };
  useEffect(() => {
    fetch(
      'https://me-api.onlinesoppa.me/reports/week/' + match.params.id,
      {
        method: 'GET', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
      },
    )
      .then(res => res.json())
      .then(response => {
        console.log('Success:', JSON.stringify(response));
        setText({
          week: match.params.id,
          data: response.data,
        });
      })
      .catch(error => console.error('Error:', error));
  }, [match.params.id]);
  return (
    <div>
      <h1> Week {match.params.id}</h1>
      <MarkdownParser content={textData.data}></MarkdownParser>
      {textData.showEditor ? (
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
