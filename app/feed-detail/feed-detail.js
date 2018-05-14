'use strict';

angular.module('feedApp.feed-detail', ['ngRoute', 'ngSanitize'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/detail/:Q_Id', {
      templateUrl: 'feed-detail/feed-detail.template.html',
      controller: 'FeedDetailController as feeds',
    });
  }])

  .controller('FeedDetailController', ['$scope', 'feedService', '$routeParams', function ($scope, feedService, $routeParams) {
    const feeds = this;
    feeds.Q_Id = $routeParams.Q_Id;
    onInit($scope, feeds, feedService);

    feeds.addVote = function (action, target) {
      if (action === "plus") {
        target.upvotes = String(1 + Number(target.upvotes || "0"));
      } else {
        target.downvotes = String(1 + Number(target.downvotes || "0"));
      }
    };
    feeds.addAnswer = function (index, Question_Id) {
      const newAnswer = {
        "Question-Id": Question_Id,
        Answer: feeds.newAnswers[index],
        created_at: moment().format("DD/MMM/YY HH:mm"),
        upvotes: "0",
        downvotes: "0",
      };
      feeds.answers.unshift(newAnswer);
      feeds.newAnswers[index] = "";
    };
    feeds.toggleClass = function (e) {
      e.target.parentNode.parentNode.parentNode.classList.toggle("small");
    };
  }]);

function onInit($scope, feeds, feedService) {
  if (feedService.isInitialized) {
    [feeds.questions, feeds.answers] = [feedService.questions, feedService.answers];
    feeds.newAnswers = Array(feeds.questions.length).fill("");
  } else {
    console.log("initializing");
    feedService.init(() => {
      [feeds.questions, feeds.answers] = [feedService.questions, feedService.answers];
      feeds.newAnswers = Array(feeds.questions.length).fill("");
      $scope.$digest();
    });
  }
}