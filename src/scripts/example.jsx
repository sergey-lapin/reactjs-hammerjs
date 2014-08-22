/**
 * @jsx React.DOM
 */

'use strict';
var React = require('react/addons');
require('bootstrap/dist/css/bootstrap.css');
var HitArea = require('./components/hitarea.jsx');
var LongTappedThing = require('./components/longtappedthing.jsx');
var BlinkingThing = require('./components/blinkingthing.jsx');
var InfiniteScroll = require('react-infinite-scroll-seed')();
var reactScrollComponents = require('react-scroll-components');
var ScrollBlocker = reactScrollComponents.ScrollBlocker;
var ScrollListenerMixin = reactScrollComponents.ScrollListenerMixin;
var moment = require('moment');

var _ = require('lodash');

/** @jsx React.DOM */

//var prevent_scroll_drag = true;
var filteredEvents = ["touch", "release", "hold", "tap", 'swipe', 'drag'];

//React.renderComponent(<div>
//    <HitArea events={filteredEvents}>
//        <LongTappedThing color="blue">
//            <div style={{width: '200px', height: '200px'}}></div>
//        </LongTappedThing>
//        <br/>
//        <BlinkingThing color="red" blinkBack="500" blinkTo="500" >
//            <div style={{width: '200px', height: '200px'}}></div>
//        </BlinkingThing>
//        <br/>
//        <BlinkingThing color="red" blinkBack="200" blinkTo="200" >
//            <div style={{width: '200px', height: '200px'}}></div>
//        </BlinkingThing>
//        <br/>
//        <BlinkingThing color="red" blinkBack="100" blinkTo="100" >
//            <div style={{width: '200px', height: '200px'}}></div>
//        </BlinkingThing>
//    </HitArea>
//    <HitArea display="inline-block" events={filteredEvents}>
//        <BlinkingThing color="red" blinkBack="100" blinkTo="100" >
//            <div style={{width: '200px', height: '200px'}}></div>
//        </BlinkingThing>
//    </HitArea>
//    <HitArea display="inline-block" events={filteredEvents}>
//        <BlinkingThing color="red" blinkBack="100" blinkTo="100" >
//            <div style={{width: '200px', height: '200px'}}></div>
//        </BlinkingThing>
//    </HitArea>
//    <HitArea eventsPane="true"/>
//</div>, document.getElementById('content')); // jshint ignore:line

var createLongTappedItem = function (num) {
    return <div key={num}>
        <HitArea display="inline-block" events={filteredEvents}>
        <LongTappedThing color="blue">
            <p>Some paragraph {num}</p>
        </LongTappedThing>
    </HitArea>
    </div>
};

var MyComponent = React.createClass({
    mixins: [ScrollListenerMixin],
    receiveHammerEvent: function (ev) {
    },
    render: function () {
        return (
            <ScrollBlocker active={this.state.isScrolling}>
             {items}
            </ScrollBlocker>
            )
    }
})
var items = _.map(_.range(1000), createLongTappedItem)

React.renderComponent(<MyComponent/>, document.getElementById('content')); // jshint ignore:line