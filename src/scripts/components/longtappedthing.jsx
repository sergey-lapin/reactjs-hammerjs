/** @jsx React.DOM */
'use strict';
var React = require('react.animate');

var LongTapColorAnimation = React.createClass({
    mixins: [React.Animate],
    changeColor: function (color) {
        if (!color || this.state.color == color) return;
        this.animate({
            color: color
        }, 300);
    },
    componentDidReceiveProps: function () {
        this.setState({color: this.props.color})
    },
    componentDidMount: function () {
        this.setState({color: this.props.color})
    },
    reactOnTouchState: function (touchState) {
        var color;
        if(touchState == this.state.touchState) return
        switch (touchState) {
            case 'touched':
                color = 'yellow';
                break;
            case 'released':
                color = 'blue';
                break;
            case 'holded':
                color = 'red';
                break;
            case 'taped':
                color = 'orange';
                break;
        }

        this.setState({touchState:touchState}, function () {
            this.changeColor(color);
        })
    },
    getInitialState: function () {
        return {touchState: null}
    },
    render: function () {
        var style = {
            display: 'inline-block',
            backgroundColor: this.state.color
        };

        var index = 0,
            children = React.Children.map(this.props.children, function (child) {
                return React.addons.cloneWithProps(child, {
                    ref: 'child-' + (index++)
                });
            });


        return (<div style={style}>{this.props.children}</div>);
    }
});

var LongTapStateHolder = React.createClass({
    componentDidReceiveProps: function () {
        this.setState({touchState: 'released'})
    },
    componentDidMount: function () {
        this.setState({touchState: 'released'})
    },
    receiveHammerEvent: function (ev) {
        var touchState;
        var that = this;
        if (ev) {
            var value = ev.type;
            switch (value) {
                case 'touch':
                    touchState = 'touched';
                    this.setState({touchState: 'touched'}, function () {
                        setTimeout(function () {
                            if(that.state.touchState == 'touched'){
                                that.setState({touchState: 'released'})
                            }
                        }, 500)
                    });
                    return;
                case 'release':
                    if(that.state.touchState == 'touched'){
                        that.setState({touchState: 'released'})
                    }
                    return;
                case 'swipe':
                    touchState = 'released';
                    break;
                case 'drag':
                    touchState = 'released';
                    break;
                case 'hold':
                    touchState = 'holded';
                    break;
                case 'tap':
                    this.setState({touchState: 'taped'}, function () {
                        setTimeout(function () {
                            that.setState({touchState: 'released'})
                        }, 500)
                    });
                    return;
            }
        }

        this.setState({touchState: touchState})
    },
    componentDidUpdate: function () {
        var that = this;
        _.each(this.refs, function (ref) {
            ref.reactOnTouchState(that.state.touchState);
        })
    },
    getInitialState: function () {
        return {touchState: 'released'}
    },
    render: function () {
        var index = 0,
            children = React.Children.map(this.props.children, function (child) {
                return React.addons.cloneWithProps(child, {
                    ref: 'child-' + (index++)
                });
            });

        return (<div>{children}
        </div>);
    }
});

var LongTappedWrapper = React.createClass({
    receiveHammerEvent: function (ev) {
        this.refs.LongTapStateHolder.receiveHammerEvent(ev);
    },
    render: function () {
        return (<LongTapStateHolder ref="LongTapStateHolder"><LongTapColorAnimation>{this.props.children}</LongTapColorAnimation></LongTapStateHolder>);
    }
});

module.exports = LongTappedWrapper