/** @jsx React.DOM */

Hammer.plugins.fakeMultitouch();

//var prevent_scroll_drag = true;
var filteredEvents = ["touch", "release", "hold", "tap"];

React.renderComponent(
    <div>
        <HitArea events={filteredEvents}>
            <LongTappedThing color="blue">
                <div style={{width: '200px', height: '200px'}}></div>
            </LongTappedThing>
            <br/>
            <BlinkedThing color="red" blinkBack="500" blinkTo="500" >
                <div style={{width: '200px', height: '200px'}}></div>
            </BlinkedThing>
            <br/>
            <BlinkedThing color="red" blinkBack="200" blinkTo="200" >
                <div style={{width: '200px', height: '200px'}}></div>
            </BlinkedThing>
            <br/>
            <BlinkedThing color="red" blinkBack="100" blinkTo="100" >
                <div style={{width: '200px', height: '200px'}}></div>
            </BlinkedThing>
        </HitArea>
        <HitArea display="inline-block" events={filteredEvents}>
            <BlinkedThing color="red" blinkBack="100" blinkTo="100" >
                <div style={{width: '200px', height: '200px'}}></div>
            </BlinkedThing>
        </HitArea>
        <HitArea display="inline-block" events={filteredEvents}>
            <BlinkedThing color="red" blinkBack="100" blinkTo="100" >
                <div style={{width: '200px', height: '200px'}}></div>
            </BlinkedThing>
        </HitArea>
        <HitArea eventsPane="true"/>
    </div>,
    $('#example')[0]
);