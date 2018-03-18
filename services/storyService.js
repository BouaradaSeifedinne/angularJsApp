'use strict';

angular.
    module('newsApp')
    .factory('storyService',['$http','$httpParamSerializerJQLike' , 'APIConfig'  ,function($http, $httpParamSerializerJQLike,APIConfig) {
    	return {
    		feedStory:function(scope){
    			var stories = [];
   				var log = [];
				/*** Func to call API login to back-end ***/
				var req = {
					method: 'GET',
					url: APIConfig.url+'/story/feed/'
				};
				$http(req).then(function successCallback(response) {
					angular.forEach(response.data,function(value, key){
			         var item = {
			              "dateCreationStory": value.dateCreationStory,
			              "tags": [
			                  {
			                      "key": "sector",
			                      "value": "test sector",
			                      "_id": "5aa7cf5f8f538d20171a4347"
			                  },
			                  {
			                      "key": "country",
			                      "value": "test country",
			                      "_id": "5aa7cf5f8f538d20171a4346"
			                  }
			              ],
			              "_id": value._id,
			              "authorId": value.authorId,
			              "title": value.title,
			              "status": value.status,
			              "summary": value.summary,
			              "price": value.price,
			              "thumbnail": value.thumbnail,
			              "__v": 0
			          }
			          stories.push(item);
				      }, log);
				}, function errorCallback(response) {
					console.log("error");
				});
				/*** end Func ***/
				scope.stories = stories;
				return stories;
	    	},

        getStoryById:function(scope,id){
          var item = {};
				/*** Func to call API login to back-end ***/
				var req = {
					method: 'GET',
					url: APIConfig.url+'/story/show/'+id
				};
				$http(req).then(function successCallback(response) {

          var value = response.data;

          item = {
               "dateCreationStory": value.dateCreationStory,
               "tags": [
                   {
                       "key": "sector",
                       "value": "test sector",
                       "_id": "5aa7cf5f8f538d20171a4347"
                   },
                   {
                       "key": "country",
                       "value": "test country",
                       "_id": "5aa7cf5f8f538d20171a4346"
                   }
               ],
               "_id": value._id,
               "authorId": value.authorId,
               "title": value.title,
               "status": value.status,
               "summary": value.summary,
               "content": value.content,
               "price": value.price,
               "thumbnail": value.thumbnail,
               "__v": 0
           };

           scope.story = item;

				}, function errorCallback(response) {
					console.log("error");
				});
				/*** end Func ***/

				return  item;
	    	}
    	}
    }]);
