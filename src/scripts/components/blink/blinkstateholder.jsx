/** @jsx React.DOM */
'use strict';


var React = require('react/addons');
var Utils = require('../utils.jsx');

var BlinkStateHolder = React.createClass({
    getDefaultProps: function() {
        return {
            tapReleaseTime: 500
        };
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