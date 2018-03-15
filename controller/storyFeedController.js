'use strict';
newsApp.controller('storyFeedController', ['$http',function($http){
   var stories = [];
   var log = [];
  $http({method: 'GET', url: 'http://127.0.0.1:3000/api/story/feed/'}).then(function successCallback(response){
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
              "thumbnail": "http://placehold.it/32x32",
              "__v": 0
          }

          stories.push(item);
          console.log(value);
      }, log);
      //this.stories.push();
      //console.log(response.data);
  }, function errorCallback(response){
      console.log("error");
  });

  this.stories = stories;

}]);
