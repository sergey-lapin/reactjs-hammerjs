/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var Hammer = require('hammer-custom');
var Utils = require('./utils.jsx');
var EventsPane = require('./eventspane.jsx');
Hammer.plugins.fakeMultitouch();

var HitArea = React.createClass({
    mixins: [React.Animate],
    logEvent: function (ev) {
        var that = this;
        if (!ev.gesture) {
            return;
        }

        if (!_.contains(this.state.eventsTrigered, ev.type)) {
            this.state.eventsTrigered.push(ev.type);
        }
        this.setState({ hammertime: this.state.hammertime,
            eventsTrigered: this.state.eventsTrigered,
            lastEvent: ev });

        _.each(that.refs, function (ref) {
            if (ref.receiveHammerEvent)
                ref.receiveHammerEvent(ev)
        })
    },
    getInitialState: function () {
        return {
            hammertime: null,
            eventsTrigered: [],
            color: 'blue',
            blinkColor: 'transparent',
            lastEvent: null,
            all_events: ["touch", "release", "hold", "tap", "doubletap", "dragstart", "drag", "dragend", "dragleft", "dragright", "dragup", "dragdown", "swipe", "swipeleft", "swiperight", "swipeup", "swipedown", "transformstart", "transform", "transformend", "rotate", "rotateleft", "rotateright", "pinch", "pinchin", "pinchout"],
            properties: ['gesture', 'center', 'deltaTime', 'angle', 'direction',
                'distance', 'deltaX', 'deltaY', 'velocityX', 'velocityY', 'pointerType',
                'scale', 'rotation', 'touches', 'target']
        }
    },
    componentDidMount: function () {
        var events = this.props.events ? this.props.events : this.state.all_events;
       var hammertime = Hammer(this.getDOMNode(), {
            prevent_default: true,
            no_mouseevents: false,
            transform_min_scale: 0,
            touchAction:'pan-y'
        }).on(events.join(" "), this.logEvent);

        this.setState({ hammertime: hammertime })
    },
    render: function () {
        var children = Utils.referenceChildren(this);

        var res;
        if (this.props.eventsPane) {
            res = <EventsPane
            eventsTrigered={this.state.eventsTrigered}
            lastEvent={this.state.lastEvent}
            hammertime={this.state.hammertime}
            all_events={this.state.all_events}
            properties={this.state.properties}
            />
        } else {
            res = children
        }

        return (<div style={{display : 'inline-block', padding: 0, margin: 0}}>
        {res}
        </div>);
    }
});

module.exports = HitArea;