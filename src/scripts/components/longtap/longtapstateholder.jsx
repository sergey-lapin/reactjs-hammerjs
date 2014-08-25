/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var Utils = require('../utils.jsx');

var LongTapStateHolder = React.createClass({
    getDefaultProps: function() {
        return {
            tapReleaseTime: 500,
            touchedReleaseTime: 500
        };
    },
    componentDidMount: function () {
        this.setState({touchState: 'released'})
    },
    receiveHammerEvent: function (ev) {
        var that = this;

        var setReleased = function () {
            that.setState({touchState: 'released'})
        };
        var map = {
            touch: function () {
                that.setState({touchState: 'touched'}, function () {
                    setTimeout(function () {
                        if(that.state.touchState == 'touched'){
                            that.setState({touchState: 'released'})
                        }
                    }, this.props.touchedReleaseTime)
                });
            },
            release: function () {
                if(that.state.touchState == 'touched'){
                    that.setState({touchState: 'released'})
                }
            },
            swipe:setReleased,
            drag: setReleased,
            hold: function () {
                that.setState({touchState: 'holded'})
            },
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

module.exports = LongTapStateHolder;