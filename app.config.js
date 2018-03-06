'use strict';

    angular.
    module('newsApp').
    config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider){
                $locationProvider.hashPrefix('!');
            
                $routeProvider.
                    when('/', {
                        templateUrl: "views/home.html"
                    }).
                    otherwise('/');
        
        }]);

    