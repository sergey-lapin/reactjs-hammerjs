/** @jsx React.DOM */
'use strict';
var React = require('react/addons');

var BlinkColorAnimation = React.createClass({
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
    componentDidReceiveProps: function () {
        this.setState({color: this.props.color})
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
            taped: function () {
                updateStateAndAnimateColor('yellow')
            },
            released: function () {
                updateStateAndAnimateColor('green')
            }
        };
        var func = map[touchState];
        if(func) func();
    },
    getInitialState: function () {
        return {touchState: null}
    },
    render: function () {
        var style = {
            display: 'inline-block',
            backgroundColor: this.state.color
        };

        return (<div style={style}>{this.props.children}</div>);
    }
});

module.exports = BlinkColorAnimation;