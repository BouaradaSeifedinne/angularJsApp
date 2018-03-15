'use strict';
newsApp.controller('storyController', ['$http','$httpParamSerializerJQLike',function($http, $httpParamSerializerJQLike){

  this.addStory = function(){
    var story = {
      "tags": [
            {
                "key": "sector",
                "value": "test sector",
            },
            {
                "key": "country",
                "value": "test country",
            }
        ],
        "authorId": "5aa3148a268d9b158e3a068c",
        "title":this.title,
        "status": "1",
        "content": this.content,
        "summary": this.summary,
        "price": this.price,
        "thumbnail": "http://placehold.it/32x32",
      };

    var req = {
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/story/add/',
      data: $httpParamSerializerJQLike(story),
      headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
      },
    };

    $http(req).then(function successCallback(response) {
        console.log(response.data);
    }, function errorCallback(response) {
        console.log(response.data);
    });

  };

  /*$http(method: 'GET', url: 'http://127.0.0.1:3000/api/story/feed/').then(function successCallback(response){
      this.stories = response.data;
  }, function errorCallback(response){
      console.log("error");
  });*/

}]);
