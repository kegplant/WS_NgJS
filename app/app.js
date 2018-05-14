'use strict';

// Declare app level module which depends on views, and components
angular.module('feedApp', [
  'ngRoute',
  'ngSanitize',
  'feedApp.feed-service',
  'feedApp.feeds',
  'feedApp.feed-detail'
]).
config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
  $locationProvider
    .html5Mode({
      enabled: false,
      rewriteLinks: true
    })
    .hashPrefix('!');

  $routeProvider.otherwise({
    redirectTo: '/'
  });
}]);