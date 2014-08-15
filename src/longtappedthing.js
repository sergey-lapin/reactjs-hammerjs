/** @jsx React.DOM */

var LongTappedThing = React.createClass({
    mixins: [React.Animate],
    changeColor: function (color) {
        if (!color || this.state.color == color) return;
        this.animate({
            color: color
        }, 500);
    },
    componentDidReceiveProps: function () {
        this.setState({color: this.props.color})
    },
    componentDidMount: function () {
        this.setState({color: this.props.color})
    },
    receiveHammerEvent: function (ev) {
        var color;
        if (ev) {
            var value = ev.type;

            switch (value) {
                case 'touch':
                    color = 'yellow';
                    break;
                case 'release':
                    color = 'blue';
                    break;
                case 'hold':
                    color = 'red';
                    break;
                case 'tap':
                    color = 'orange';
                    break;
            }
        }

        this.changeColor(color)
    },
    getInitialState: function () {
        return {};
    },
    render: function () {
        var style = {
            display: 'inline-block',
            backgroundColor: this.state.color
        };

        return (<div style={style}>{this.props.children}
        </div>);
    }
});