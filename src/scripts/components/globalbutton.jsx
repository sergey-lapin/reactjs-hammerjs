/** @jsx React.DOM */
'use strict';

var React = require('react/addons');

var $ = require('jquery');

var ReactBoostrap = require('react-bootstrap');
var Button = ReactBoostrap.Button;

var GlobalButton = React.createClass({
    receiveHammerEvent: function (ev) {
        var evt = $.Event('globalHammer');
        evt.hammerEv = ev;
        $(window).trigger(evt);
    },
    render: function () {
        return (<Button bsStyle="success">Holy guacamole!</Button>)
    }
});

module.exports = GlobalButton;