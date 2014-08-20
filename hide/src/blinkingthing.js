/** @jsx React.DOM */

var BlinkingThing = React.createClass({
    mixins: [React.Animate],
    blink: function () {
        var that = this;
        var animateAfter = function () {
            that.animate({
                color: 'green'
            }, that.props.blinkBack);
        };
        this.animate({
            color: 'yellow'
        }, this.props.blinkTo, animateAfter);
    },
    componentDidReceiveProps: function () {
        this.setState({color: this.props.color})
    },
    componentDidMount: function () {
        this.setState({color: this.props.color})
    },
    receiveHammerEvent: function (ev) {
        if (ev) {
            var value = ev.type;

            switch (value) {
                case 'tap':
                    this.blink();
                    break;
            }
        }
    },
    getInitialState: function () {
        return {};
    },
    render: function () {
        var style = {
            display: 'inline-block',
            backgroundColor: this.state.color
        };

        return (<div style={style}>{this.props.children}</div>);
    }
});
