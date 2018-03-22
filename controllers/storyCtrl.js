'use strict';

angular.
    module('newsApp')
    .controller('storyCtrl',[ '$routeParams','$scope','$rootScope', '$location', 'loginService','storyService' , function($routeParams,$scope,$rootScope, $location, loginService ,storyService) {

       	$scope.logout = function (){
    		loginService.logout($location);
    	}
        var currentId = $routeParams.id;
  	     if(currentId) $scope.story =storyService.getStoryById($scope,currentId); //call StoryFeed Service

    		$rootScope.showHeaderFooter = true;
        //$rootScope.role=  sessionStorage.getItem('role');

    		$scope.saveStory = function () {
    			storyService.addStory($scope.new_story,$location, $rootScope);
    		}

    		/*$scope.editStory = function () {
    			storyService.updateStory(currentId,$scope.edit, $scope.story);
    		}*/


        $scope.editStory = function () {
    			storyService.updateStory(currentId,$scope.edit, $scope.story);
    		}

    		$scope.readURL = function (input) {
    				if (input.files && input.files[0]) {
    					var reader = new FileReader();
    					reader.onload = function (e) {
    						document.getElementById('thumb2').value =  e.target.result;
    					}
    				reader.readAsDataURL(input.files[0]);
    				console.log('test');
    				}
  			}



    }]);
