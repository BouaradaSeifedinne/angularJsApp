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
                templateUrl: "views/story/viewStoryMember.html",
                controller : 'storyCtrl'
            }).
            otherwise('/');
        
        }])

    .constant('APIConfig', {
        url : 'http://127.0.0.1:3000/api'
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