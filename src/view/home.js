import React from 'react';
import logo from '.././me.jpg';
import '../style/Home.css';

export default class Index extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Home</h1>
        <p>
          This is me, My name is Gustav and I am a third (and last)
          year student in Webprogramming.
        </p>
        <p>
          I like to code and develop web applications of any sorts. I
          created a web GUI for IoT sensors in a previous project with
          a group of students. I enjoy working with python and
          javascript and prefer working with both front-end and
          back-end.
        </p>
        <img src={logo} alt="me" width="150px" height="150px"></img>
      </div>
    );
  }
}
