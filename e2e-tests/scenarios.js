'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('feed app', function() {


  it('should automatically redirect to / when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getCurrentUrl()).toMatch("/");
  });

});
