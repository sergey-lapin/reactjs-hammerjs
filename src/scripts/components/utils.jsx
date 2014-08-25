/** @jsx React.DOM */
'use strict';
var React = require('react/addons');
module.exports = {
    referenceChildren : function (component) {
        var index = 0;
        return React.Children.map(component.props.children, function (child) {
            return React.addons.cloneWithProps(child, {
                ref: 'child-' + (index++)
            });
        });
    },
    simpleTransclude : function (component) {
        return (<div>{this.referenceChildren(component)}</div>);
    }
};