/** @jsx React.DOM */
'use strict';
var React = require('react/addons');
var Utils = require('../utils.jsx');

var LongTapColorAnimation = React.createClass({
    mixins: [React.Animate],
    getDefaultProps: function() {
        return {
            changeColorAnimationTime: 300
        };
    },
    changeColor: function (color) {
        if (!color || this.state.color == color) return;
        this.animate({
            color: color
        }, this.props.changeColorAnimationTime);
    },
    componentDidMount: function () {
        this.setState({color: this.props.color})
    },
    reactOnTouchState: function (touchState) {
        if(touchState == this.state.touchState) return;

        var that = this;
        var updateStateAndAnimateColor = function (color) {
            that.setState({touchState:touchState}, function () {
                that.changeColor(color);
            })
        };
        var map = {
            touched: function () {
                updateStateAndAnimateColor('yellow')
            },
            released: function () {
                updateStateAndAnimateColor('blue')
            },
            holded: function () {
                updateStateAndAnimateColor('red')
            },
            taped: function () {
                updateStateAndAnimateColor('orange')
            }
        };
        var func = map[touchState];
        if(func) func();
    },
    getInitialState: function () {
        return {touchState: null}
    },
    componentDidUpdate: function () {
        this.props.onStateChange(this.state.touchState)
    },
    render: function () {
        var style = {
            display: 'inline-block',
            backgroundColor: this.state.color
        };


        return (<div style={style}>{this.props.children}</div>);
    }
});

module.exports = LongTapColorAnimation;