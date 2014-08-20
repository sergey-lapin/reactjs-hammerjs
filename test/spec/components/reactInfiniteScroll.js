'use strict';

describe('Main', function () {
  var WebpackApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    WebpackApp = require('test/spec/components/reactInfiniteScroll.js');
    component = WebpackApp();
  });

  it('should create a new instance of WebpackApp', function () {
    expect(component).toBeDefined();
  });
});
