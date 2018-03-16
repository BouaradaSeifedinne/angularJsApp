'use strict';
newsApp.controller('storyCtrl', ['$http','$scope',function($http,$scope) {
     var items = [];
    $http({method: 'GET', url: 'http://127.0.0.1:3000/api/story/show/5aa824fd4cd10a26fc9516ee'}).then(function successCallback(response){
        
        var item = {
            "dateCreationStory": response.data.dateCreationStory,
            "tags": [
                {
                    "key": "sector",
                    "value": response.data.sector,
                },
                {
                    "key": "country",
                    "value": response.data.country,
                }
            ],
            "_id": response.data._id,
            "authorId": response.data.authorId,
            "title": response.data.title,
            "status": response.data.status,
            "summary": response.data.summary,
            "price": response.data.price,
            "thumbnail": "http://placehold.it/32x32",
            "__v": 0
        };
       items.push(item);
    }, function errorCallback(response){
        console.log("error");
    });
    this.items = items;
   

}]);