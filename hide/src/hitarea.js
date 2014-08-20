/** @jsx React.DOM */

var EventsPane = React.createClass({
    preventDefault: function () {
        this.props.hammertime.options.prevent_default = this.checked;
    },
    render: function () {
        var that = this;
        var eventsLi = [];

        _.each(this.props.all_events, function (ev) {
            var classes = '';
            if (_.contains(that.props.eventsTrigered, ev)) {
                classes += 'active'
            }

            var row = <li className={classes}>{ev}</li>;
            eventsLi.push(row)
        });

        var props = _.map(this.props.properties, function (prop) {
            var classes = '';
            if (prop == 'gesture') {
                classes += 'property-gesture'

            }
            var value;
            return (<li className={classes}>
                <strong>{prop}</strong>
                <span>{value} </span>
            </li>)
        });

        return (
            <div >
                <p className="alert">
                    <strong>Press shift on your desktop for multitouch.</strong>
                </p>
                <p>
                    <label className="checkbox">
                        <input type="checkbox" onClick={this.preventDefault} />
                    block browser behavior (preventDefault)
                    </label>
                </p>
                <div id="hitarea" className="container">
                    <div className="log well well-small">
                        <h4>Events</h4>
                        <ul className="unstyled events" id="events-list">
                            {eventsLi}
                        </ul>
                        <h4>EventData</h4>
                        <ul className="unstyled properties">
                            {props}
                        </ul>
                    </div>
                </div>
            </div>
            );
    }
});

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
            no_mouseevents: true
        }).on(events.join(" "), this.logEvent);
        this.setState({ hammertime: hammertime })
    },
    render: function () {
        var index = 0,
            children = React.Children.map(this.props.children, function (child) {
                return React.addons.cloneWithProps(child, {
                    ref: 'child-' + (index++)
                });
            });

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