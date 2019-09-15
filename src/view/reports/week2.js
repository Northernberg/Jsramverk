import React from 'react';

function Week2() {
  return (
    <div>
      <h1> This is week 2</h1>
      <p>
        <a href="https://github.com/Northernberg/Jsramverk">
          {' '}
          Link to GitHub
        </a>
      </p>
      <p>
        {' '}
        What I thought about the registration form was to make it
        responsive and clean design. I put the firstname and lastname
        fields on the same row so that they would be more coherent.
        The rest of the fields are placed in a more column-like
        position, having native design in mind. The first problem that
        occured for me was to write dynamic days for each month in the
        datepicker. My solution was to put 'month' before 'day' field
        so that the user selects a month and the days gets updated
        dynamically. I put in 100 years back from today for the 'year'
        field to a simple and concrete pool of years. I also put a
        over 18 validation for the datepicker.
      </p>
    </div>
  );
}
export default Week2;
