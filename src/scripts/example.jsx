/**
 * @jsx React.DOM
 */

'use strict';
var $ = require('jquery');
var React = require('react/addons');

require('bootstrap/dist/css/bootstrap.css');
var HitArea = require('./components/hitarea.jsx');
var LongTappedThing = require('./components/longtap/wrapper.jsx');
var BlinkingThing = require('./components/blink/wrapper.jsx');
var InfiniteScroll = require('react-infinite-scroll-seed')();

var reactScrollComponents = require('react-scroll-components');
var ScrollBlocker = reactScrollComponents.ScrollBlocker;
var ScrollListenerMixin = reactScrollComponents.ScrollListenerMixin;

var ReactBoostrap = require('react-bootstrap');
var OverlayTrigger = ReactBoostrap.OverlayTrigger;
var Button = ReactBoostrap.Button;
var ButtonToolbar = ReactBoostrap.ButtonToolbar;
var Popover = ReactBoostrap.Popover;

var moment = require('moment');

var Mixins = require('./mixins.jsx');
var UpdateDimensionsOnResize = Mixins.UpdateDimensionsOnResize;

var GlobalButton = require('./components/globalbutton.jsx');
var OverlayAdjustWindowTrigger = require('./components/overlayadjustwindowtrigger.jsx');

var _ = require('lodash');

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

var MyComponent = React.createClass({
    mixins: [UpdateDimensionsOnResize],
    render: function () {
        var that = this;

        var createLongTappedItem = function (num) {
            var orientation = num % 2 ? 'horizontal' : 'vertical';

            var overlay = (<Popover>
                <HitArea events={['touch']}>
                    <GlobalButton/>
                </HitArea>
            </Popover>);

            return <div key={num}>
                <HitArea display="inline-block" events={filteredEvents}>
                    <LongTappedThing
                    overlay={overlay}
                    orientation={orientation}
                    windowWidth={that.state.windowWidth}
                    windowHeight={that.state.windowHeight}
                    color="blue">
                        <p>Some paragraph {num}</p>
                    </LongTappedThing>
                </HitArea>
            </div>
        };

        var createItem = function (num) {
            var orientation = num % 2 ? 'horizontal' : 'vertical';

            var overlay = (<Popover>
                <HitArea events={['touch']}>
                    <GlobalButton/>
                </HitArea>
            </Popover>);

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