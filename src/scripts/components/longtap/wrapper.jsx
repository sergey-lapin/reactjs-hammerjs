/** @jsx React.DOM */
'use strict';
var React = require('react.animate');
var LongTappedContextMenu = require('./longtappedcontextmenu.jsx');
var ReactBoostrap = require('react-bootstrap');
var Button = ReactBoostrap.Button;

var LongTappedContextMenuWrapper = React.createClass({
    receiveHammerEvent: function (ev) {
        this.refs.LongTappedContextMenu.receiveHammerEvent(ev);
    },
    render: function () {
        return (<LongTappedContextMenu ref="LongTappedContextMenu"
                orientation={this.props.orientation}
                overlay={this.props.overlay}
                windowWidth={this.props.windowWidth}
                windowHeight={this.props.windowHeight}>
               {this.props.children}
        </LongTappedContextMenu>);
    }
});

var LongTappedWrapper = React.createClass({
    receiveHammerEvent: function (ev) {
        this.refs.LongTapStateHolder.receiveHammerEvent(ev);
    },
    render: function () {
        return (<LongTapStateHolder ref="LongTapStateHolder">
            <LongTapColorAnimation>{this.props.children}</LongTapColorAnimation>
        </LongTapStateHolder>);
    }
});

module.exports = LongTappedContextMenuWrapper