/** @jsx React.DOM */
'use strict';
var React = require('react/addons');
var LongTapStateHolder = require('./longtapstateholder.jsx');
var LongTapColorAnimation = require('./longtapcoloranimation.jsx');
var OverlayAdjustWindowTrigger = require('../overlayadjustwindowtrigger.jsx');
var ReactBoostrap = require('react-bootstrap');
var Button = ReactBoostrap.Button;

var LongTappedContextMenu = React.createClass({
    getInitialState: function () {
        return {touchState: null}
    },
    receiveHammerEvent: function (ev) {
        this.setState({lastHammerEvent:ev});
        this.refs.LongTapStateHolder.receiveHammerEvent(ev);
    },
    onStateChange : function (touchState) {
        if(touchState != this.state.touchState){
            this.setState({touchState:touchState}, function () {
                if(touchState == 'holded'){
                    var OverlayTrigger =  this.refs.OverlayAdjustWindowTrigger;
                    var xy = OverlayTrigger.getXY(this.state.lastHammerEvent);
                    OverlayTrigger.showInPoint(xy);
                }
            });
        }
    },
    onContextMenuHide: function(){
        this.refs.LongTapStateHolder.setState({touchState:'released'})
    },
    render: function () {
        return (<LongTapStateHolder ref="LongTapStateHolder" >
            <LongTapColorAnimation onStateChange={this.onStateChange}>
                <OverlayAdjustWindowTrigger
                onHide={this.onContextMenuHide}
                ref="OverlayAdjustWindowTrigger"
                orientation={this.props.orientation}
                overlay={this.props.overlay}
                windowWidth={this.props.windowWidth}
                windowHeight={this.props.windowHeight}>
                    {this.props.children}
                </OverlayAdjustWindowTrigger>
            </LongTapColorAnimation>
        </LongTapStateHolder>);
    }
});

module.exports = LongTappedContextMenu;