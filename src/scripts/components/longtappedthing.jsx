/** @jsx React.DOM */
'use strict';
var React = require('react.animate');

var LongTappedColored = React.createClass({
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

        return (<div style={style}>{this.props.children}</div>);
    }
});

var LongTappedThing = React.createClass({
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
            console.log(value)
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

        this.refs.LongTappedColored.reactOnTouchState(this.state.touchState);
    },
    getInitialState: function () {
        return {touchState: 'released'}
    },
    render: function () {
        return (<LongTappedColored ref='LongTappedColored'>{this.props.children}
        </LongTappedColored>);
    }
});

module.exports = LongTappedThing