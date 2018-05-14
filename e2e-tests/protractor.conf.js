//jshint strict: false
exports.config = {

  allScriptsTimeout: 11000,
  chromeOnly: true,
  directConnect: true,
  specs: [
    '*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};
