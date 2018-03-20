'use strict';

    var app = angular.
    module('newsApp').
    config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider){
        $locationProvider.hashPrefix('!');

        $routeProvider.
            when('/', {
                templateUrl: "views/home.html",
                controller : 'homeCtrl'
            }).
            when('/login', {
                templateUrl: "views/login/login.html",
                controller : 'loginCtrl'
            }).
            when('/logout', {
                templateUrl: "views/login/login.html",
                controller : 'loginCtrl'
            }).
            when('/profile', {
                templateUrl: "views/user/profile.html",
                controller : 'homeCtrl'
            }).
            when('/story/view:id', {
                templateUrl:  "views/story/viewStory.html",
                controller : 'storyCtrl'
            }).
            when('/story/add_story', {
                templateUrl: "views/story/add_story.html",
                controller : 'storyCtrl'
            }).
            when('/story/edit_story/:id', {
                templateUrl: "views/story/edit_story.html",
                controller: 'storyCtrl'
            }).
            otherwise('/');

        }])

    .constant('APIConfig', {
        url : 'http://127.0.0.1:3000/api'
    })

    .constant('StatusStory', {
        1 : 'Draft',
        2 : 'validation waiting',
        3 : 'Published',
        4 : 'Rejected'
    })


   .run(function($rootScope, $location,loginService){
        var routesPermission = ['/']; // all routes that login is required
        // for exemple '/' ==> the home path , 'Profile' ==> userProfile
        $rootScope.$on('$routeChangeStart', function(){
            if(routesPermission.indexOf($location.path()) !=-1
                && !loginService.isLogged($location)){
                $location.path('/login');
            }
        });
    });
