'use strict';

angular.
    module('newsApp')
    .controller('homeCtrl',[ '$scope','$rootScope', '$location', 'loginService','storyService' , function($scope,$rootScope, $location, loginService ,storyService) {



    	$scope.logout = function (){
    		loginService.logout($location);
    	}

    	$scope.Storys = storyService.feedStory($scope); //call StoryFeed Service

        console.log($scope.Storys ,' storys');
          $rootScope.role=  sessionStorage.getItem('role');

    	$rootScope.showHeaderFooter = true;
    }]);
