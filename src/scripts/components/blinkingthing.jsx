/** @jsx React.DOM */
'use strict';
var React = require('react.animate');
var BlinkStateHolder = require('./blink/blinkstateholder.jsx');
var BlinkColorAnimation = require('./blink/blinkcoloranimation.jsx');


var BlinkpedWrapper = React.createClass({
    receiveHammerEvent: function (ev) {
        this.refs.BlinkStateHolder.receiveHammerEvent(ev);
    },
    render: function () {
        return (<BlinkStateHolder ref="BlinkStateHolder"><BlinkColorAnimation>{this.props.children}</BlinkColorAnimation></BlinkStateHolder>);
    }
});

module.exports = BlinkpedWrapper;