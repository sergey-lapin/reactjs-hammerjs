/** @jsx React.DOM */
'use strict';

var React = require('react/addons');

var ReactBoostrap = require('react-bootstrap');
var OverlayTrigger = ReactBoostrap.OverlayTrigger;
var Button = ReactBoostrap.Button;
var ButtonToolbar = ReactBoostrap.ButtonToolbar;
var Popover = ReactBoostrap.Popover;

var OverlayAdjustWindowTrigger = React.createClass({
    getXY : function (event) {
        var res = event.gesture.touches[0]
        return {x: res.pageX, y: res.pageY}
    },
    receiveHammerEvent: function (ev) {
        var that = this;        if (ev) {
            var value = ev.type;
            switch (value) {
                case 'tap':
                    that.setState({placement: that.calcPlacement(that.getXY(ev))});
                    this.refs.OverlayTrigger.toggle();
                    return;
            }
        }
    },
    calcPlacement: function (XY) {
        if (this.props.orientation == 'horizontal') {
            if (this.props.windowWidth / 2 < XY.x)
                return 'left';
            else
                return 'right';
        }

        if (this.props.orientation == 'vertical') {
            if (this.props.windowHeight / 2 < XY.y)
                return 'top';
            else
                return 'bottom';
        }
    },
    receiveGlobalHammer: function (e) {
        var point = this.getXY(e.hammerEv);
        if(this.refs.OverlayTrigger.state.isOverlayShown && !this.refs.OverlayTrigger.isMine(point)){
            this.refs.OverlayTrigger.toggle()
        }
    },
    componentDidMount: function () {
        $(window).on('globalHammer', this.receiveGlobalHammer);
    },
    componentDidUnmount: function () {
        $(window).off('globalHammer', this.receiveGlobalHammer);
    },
    getInitialState: function () {
        return {placement: null}
    },
    render: function () {
        return (
            <OverlayTrigger ref="OverlayTrigger"
            trigger="manual"
            placement={this.state.placement}
            overlay={this.props.overlay}>
                {this.props.children}
            </OverlayTrigger>
            )
    }
});

module.exports = OverlayAdjustWindowTrigger;