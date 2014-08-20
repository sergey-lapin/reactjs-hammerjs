/**
 * @jsx React.DOM
 */

'use strict';
var React = require('react/addons');
var Wrapper = require('./components/wrapper.jsx')();

var moment = require('moment');
var _ = require('lodash');

React.renderComponent(<Wrapper />, document.getElementById('content')); // jshint ignore:line