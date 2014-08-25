/**
 * @jsx React.DOM
 */

'use strict';
var $ = require('jquery');

module.exports = {};
var UpdateDimensionsOnResize = {
    updateDimensions: function () {
        this.setState({ windowHeight: $(window).height(), windowWidth: $(window).width()});
    },
    componentWillMount: function () {
        this.updateDimensions();
    },
    componentDidMount: function () {
        window.addEventListener("resize", this.updateDimensions);
    },
    componentWillUnmount: function () {
        window.removeEventListener("resize", this.updateDimensions);
    }
};

module.exports.UpdateDimensionsOnResize = UpdateDimensionsOnResize;
