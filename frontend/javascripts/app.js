import Main from './components/_Main.js';

require('material-design-lite/material');

const React = require('react');
const ReactDOM = require('react-dom');

window.moment = require('moment');

ReactDOM.render(<Main />, document.querySelector('#app'));