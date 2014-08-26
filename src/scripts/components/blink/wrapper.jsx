/** @jsx React.DOM */
'use strict';
var React = require('react.animate');
var BlinkStateHolder = require('./blinkstateholder.jsx');
var BlinkColorAnimation = require('./blinkcoloranimation.jsx');


var BlinkpedWrapper = React.createClass({
    receiveHammerEvent: function (ev) {
        this.refs.BlinkStateHolder.receiveHammerEvent(ev);
    },
    render: function () {
        return (<BlinkStateHolder ref="BlinkStateHolder"><BlinkColorAnimation>{this.props.children}</BlinkColorAnimation></BlinkStateHolder>);
    }
});

module.exports = BlinkpedWrapper;