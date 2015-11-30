'use strict';

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Navbar } from './../../src/components/navbar';

describe('Navbar', function() {
  var component;

  beforeEach(function(){
    component = TestUtils.renderIntoDocument(<Navbar />);
  });

  it('has links to the correct pages', function() {
    var links = component.getDOMNode().querySelector('ul').children;
    for (var i = links.length - 1; i >= 0; i--) {
      var navText = links[i].innerText;
      var navLink = component.links[navText];

      expect(navLink).toBeDefined();
      expect(navText).toBeDefined();
      expect(navLink).toContain('/dashboard');
    };
  });
});
