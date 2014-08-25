/**
 * @jsx React.DOM
 */

'use strict';
var $ = require('jquery');
var React = require('react/addons');
var ReactBoostrap = require('react-bootstrap');
require('bootstrap/dist/css/bootstrap.css');
var HitArea = require('./components/hitarea.jsx');
var LongTappedThing = require('./components/longtappedthing.jsx');
var BlinkingThing = require('./components/blinkingthing.jsx');
var InfiniteScroll = require('react-infinite-scroll-seed')();
var reactScrollComponents = require('react-scroll-components');
var ScrollBlocker = reactScrollComponents.ScrollBlocker;
var ScrollListenerMixin = reactScrollComponents.ScrollListenerMixin;
var OverlayTrigger = ReactBoostrap.OverlayTrigger;
var Button = ReactBoostrap.Button;
var ButtonToolbar = ReactBoostrap.ButtonToolbar;
var Popover = ReactBoostrap.Popover;
var moment = require('moment');

var _ = require('lodash');

/** @jsx React.DOM */

//var prevent_scroll_drag = true;
var filteredEvents = ["touch", "release", "hold", "tap", 'swipe', 'drag'];

/*<HitArea events={filteredEvents}>
    <LongTappedThing color="blue">
        <div style={{width: '200px', height: '200px'}}></div>
    </LongTappedThing>
    <br/>
    <BlinkingThing color="red" blinkBack="500" blinkTo="500" >
        <div style={{width: '200px', height: '200px'}}></div>
    </BlinkingThing>
    <br/>
    <BlinkingThing color="red" blinkBack="200" blinkTo="200" >
        <div style={{width: '200px', height: '200px'}}></div>
    </BlinkingThing>
    <br/>
    <BlinkingThing color="red" blinkBack="100" blinkTo="100" >
        <div style={{width: '200px', height: '200px'}}></div>
    </BlinkingThing>
</HitArea>
<HitArea display="inline-block" events={filteredEvents}>
    <BlinkingThing color="red" blinkBack="100" blinkTo="100" >
        <div style={{width: '200px', height: '200px'}}></div>
    </BlinkingThing>
    </HitArea>
<HitArea display="inline-block" events={filteredEvents}>
    <BlinkingThing color="red" blinkBack="100" blinkTo="100" >
        <div style={{width: '200px', height: '200px'}}></div>
    </BlinkingThing>
</HitArea>*/

//React.renderComponent(<div>
//
//    <HitArea eventsPane="true"/>
//</div>, document.getElementById('content')); // jshint ignore:line


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

var UpdateDimensionsOnResize = {
    updateDimensions: function () {
        this.setState({ windowHeight: $(window).height(), windowWidth: $(window).width()});
    },
    componentWillMount: function () {
        this.updateDimensions();
    },
    componentDidMount: function () {
        window.addEventListener("resize", this.updateDimensions);
    },
    componentWillUnmount: function () {
        window.removeEventListener("resize", this.updateDimensions);
    }
};

var GlobalButton = React.createClass({
    receiveHammerEvent: function (ev) {
        var evt = $.Event('globalHammer');
        evt.hammerEv = ev;
        $(window).trigger(evt);
    },
    render: function () {
        return (<Button bsStyle="success">Holy guacamole!</Button>)
    }
});

var MyComponent = React.createClass({
    mixins: [UpdateDimensionsOnResize],
    render: function () {
        var that = this;

        var createLongTappedItem = function (num) {
            return <div key={num}>
                <HitArea display="inline-block" events={filteredEvents}>
                    <BlinkingThing color="blue">
                        <p>Some paragraph {num}</p>
                    </BlinkingThing>
                </HitArea>
            </div>
        };


        var createItem = function (num) {
            var orientation = num % 2 ? 'horizontal' : 'vertical';

            var overlay = (<Popover>
                <HitArea events={['touch']}><GlobalButton/></HitArea></Popover>);

            return <div key={num}>
                <HitArea display="inline-block" events={filteredEvents}>
                    <OverlayAdjustWindowTrigger orientation={orientation} overlay={overlay}
                    windowWidth={that.state.windowWidth}
                    windowHeight={that.state.windowHeight}>
                        <Button bsStyle="default">Holy guacamole!</Button>
                    </OverlayAdjustWindowTrigger>
                </HitArea>
            </div>
        };

        var createRow = function (i, num) {
            var items = _.map(_.range(num), function (j) {
                return createLongTappedItem(j)
            });
            return <div key={i} style={{display: 'inline-block'}}>
                {items}
            </div>
        };

        var items = _.map(_.range(10), function (i) {
            var numInRow = 20;
            return createRow(i, numInRow)
        });

        return (
            <ScrollBlocker active={this.state.isScrolling}>
             {items}
            </ScrollBlocker>
            )
    }
});


React.renderComponent(<div>
    <MyComponent/>
</div>, document.getElementById('content')); // jshint ignore:line