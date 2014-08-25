/** @jsx React.DOM */
'use strict';
var React = require('react.animate');
var LongTapStateHolder = require('./longtap/longtapstateholder.jsx');
var LongTapColorAnimation = require('./longtap/longtapcoloranimation.jsx');


var LongTappedWrapper = React.createClass({
    receiveHammerEvent: function (ev) {
        this.refs.LongTapStateHolder.receiveHammerEvent(ev);
    },
    render: function () {
        return (<LongTapStateHolder ref="LongTapStateHolder"><LongTapColorAnimation>{this.props.children}</LongTapColorAnimation></LongTapStateHolder>);
    }
});

module.exports = LongTappedWrapper