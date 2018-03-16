'use strict';

    angular.
    module('newsApp').
    config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider){
                $locationProvider.hashPrefix('!');
                $routeProvider.
                    when('/', {
                        templateUrl: "views/home.html"
                    }).
                    when('/feed', {
                        templateUrl: "views/feed.html"
                    }).
                    when('/add_story', {
                        templateUrl: "views/add_story.html"
                    }).
                    when('/edit_story', {
                        templateUrl: "views/edit_story.html",
                        controller: 'storyCtrl',
                    }).
                    otherwise('/');

        }]);
