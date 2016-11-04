require('material-design-lite/material');

const React = require('react');
const ReactDOM = require('react-dom');
const Main = require('./components/_Main.jsx');
const $ = require('jquery');

$(document).ready(() => {
  ReactDOM.render(<Main />, document.querySelector('#app'));
});