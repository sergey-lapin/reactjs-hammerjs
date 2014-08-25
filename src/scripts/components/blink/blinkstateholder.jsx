/** @jsx React.DOM */
'use strict';


var React = require('react/addons');
var Utils = require('../utils.jsx');

var BlinkStateHolder = React.createClass({
    getInitialState: function () {
        return {touchState: 'released'}
    },
    getDefaultProps: function() {
        return {
            tapReleaseTime: 500
        };
    },
    componentDidReceiveProps: function () {
        this.setState({touchState: 'released'})
    },
    componentDidMount: function () {
        this.setState({touchState: 'released'})
    },
    receiveHammerEvent: function (ev) {
        var that = this;

        var map = {
            tap: function () {
                that.setState({touchState: 'taped'}, function () {
                    setTimeout(function () {
                        that.setState({touchState: 'released'})
                    }, that.props.tapReleaseTime)
                });
            }
        };
        if (ev) {
            var func = map[ev.type];
            if(func) func();
        }
    },
    componentDidUpdate: function () {
        console.log(this.state.touchState)
        var that = this;
        _.each(this.refs, function (ref) {
            ref.reactOnTouchState(that.state.touchState);
        })
    },
    render: function () {
        return Utils.simpleTransclude(this);
    }
});

module.exports = BlinkStateHolder;