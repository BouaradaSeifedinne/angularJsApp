'use strict';

angular.
    module('newsApp')
    .controller('loginCtrl',function($scope,$rootScope, $location, loginService) {
    	$scope.error = '';
    	$rootScope.showHeaderFooter = false;
    	$scope.login = function(user){
    		loginService.login(user,$scope,$rootScope,$location); //call login serv
		}
    });
