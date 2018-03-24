'use strict';

angular.
    module('newsApp')
    .controller('homeCtrl',[ '$scope','$rootScope', '$location', 'loginService','storyService' , function($scope,$rootScope, $location, loginService ,storyService) {

    	$scope.logout = function (){
    		loginService.logout($location);
    	}

      //loginService.getUserCred($rootScope);
      $rootScope.userCred = loginService.getUserCred($rootScope,$location); //call StoryFeed Service
    	$scope.Storys = storyService.feedStory($scope); //call StoryFeed Service
      $rootScope.role=  sessionStorage.getItem('role');
    	$rootScope.showHeaderFooter = true;
      

      $scope.FiltersByStatus = function (id_Filter) {
        if(id_Filter === "All") $scope.stories = $scope.Storys;
        else $scope.stories = storyService.FiltersByStatus($scope.Storys,id_Filter);
      };

      console.log($scope);

      //console.log($scope,' Root scope');

    }]);
