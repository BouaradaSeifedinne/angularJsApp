'use strict';

angular.
    module('newsApp')
    .controller('storyCtrl',[ '$routeParams','$scope','$rootScope', '$location', 'loginService','storyService' , function($routeParams,$scope,$rootScope, $location, loginService ,storyService) {

       	$scope.logout = function (){
    		loginService.logout($location);
    	}
        var currentId = $routeParams.id;
  	    $scope.story =storyService.getStoryById($scope,currentId); //call StoryFeed Service
		$rootScope.showHeaderFooter = true;

		$scope.saveStory = function () {
			storyService.addStory($scope.new_story);
		}

		$scope.editStory = function () {
			storyService.updateStory(currentId,$scope.edit, $scope.story);
		}
    }]);
