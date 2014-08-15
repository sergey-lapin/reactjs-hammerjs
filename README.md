reactjs-hammerjs
================

reactjs hammerjs integration with animations

## How to use it?
Just download this repo and open **examples/reacthammer.html** it is not really well structured (bad I just put everything that I have for this moment in one example) but u can click and figure up what happens

## hammerjs
This example inspired by [old hammer](https://github.com/thecoded/hammer.js) (new hammer is a way too different for me to understand and use it here) especially by this [page](http://thecoded.com/swipe/examples/events.html) which was extremely useful during testing events support on mobile phones.

## reactjs 
I did not find proper [syntatic touch events](http://facebook.github.io/react/docs/events.html#touch-events) support in react yet as I want to be able to use all hammer suported events:

"touch", "release", "hold", "tap", "doubletap", "dragstart", "drag", "dragend", "dragleft", "dragright", "dragup", "dragdown", "swipe", "swipeleft", "swiperight", "swipeup", "swipedown", "transformstart", "transform", "transformend", "rotate", "rotateleft", "rotateright", "pinch", "pinchin", "pinchout"

Cause hammer use real dom nodes react will weaken by this.getDOMNode() calls, but it this reeeeeealy fast.  

## HitArea
HitArea is a main react component  of this repo it can log self on EventsPane just like that

```javascript
React.renderComponent(         
       <HitArea eventsPane="true"/>,
    $('#example')[0]
);
```

HitArea is transcludable u can use it like that: 

```javascript
React.renderComponent(         
        <HitArea>
            <BlinkedThing color="red" blinkBack="100" blinkTo="100" >
                <div style={{width: '200px', height: '200px'}}></div>
            </BlinkedThing>
        </HitArea>,
    $('#example')[0]
);
```

It tries to pass all hammer events to childs if they have receiveHammerEvent method

U can restrict HitArea to observe only some of events like that:

```javascript
React.renderComponent(         
       <HitArea events={["dragstart", "drag", "dragend"]}>
         ...
      </HitArea>,
    $('#example')[0]
);
```

## reactjs animate
I animate examples using that [thing](https://github.com/pleasetrythisathome/react.animate) it depends on [d3](http://d3js.org/)
