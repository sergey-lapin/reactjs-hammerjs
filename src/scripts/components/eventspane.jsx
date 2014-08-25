/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var Utils = require('./utils.jsx');

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
            </div>);
    }
});


module.exports = EventsPane;