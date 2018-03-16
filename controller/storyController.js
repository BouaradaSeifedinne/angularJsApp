'use strict';
newsApp.controller('storyController', ['$http', '$httpParamSerializerJQLike', function ($http, $httpParamSerializerJQLike) {
    this.addStory = function () {
        var story = {
            "tags": [
                {
                    "key": "Topic",
                    "value": this.topicsTag,
                },
                {
                    "key": "Country",
                    "value": this.countriesTag,
                }
            ],
            "dateCreationStory": Date.now(),
            "dateLastUpdate": Date.now(),
            "authorId": "5aa3148a268d9b158e3a068c",
            "editorId": "5aa3148a268d9b158e3a068c",
            "title": this.title,
            "status": "1",
            "content": this.content,
            "summary": this.summary,
            "price": this.price,
            "thumbnail": "thumbnail",
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
    }
}]);

