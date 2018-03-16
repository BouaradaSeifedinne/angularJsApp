'use strict';
newsApp.controller('storyCtrl', ['$http','$httpParamSerializerJQLike','$routeParams',function($http,$httpParamSerializerJQLike,$routeParams) {
    
    this.editStory = function (id) {
      
        console.log('this.price',this);
        var title = this.title ? this.title : this.items[0].title;
        var sector = this.sector ? this.sector: this.items[0].sector;
        var country = this.country ? this.country: this.items[0].country;
        var content = this.content ? this.content: this.items[0].content;
        var summary = this.summary ? this.summary: this.items[0].summary;
        var price = this.price ? this.price: this.items[0].price;
        console.log('title',sector);
        var story = {
            "tags": [
                {
                    "key": "Topic",
                    "value": sector,
                },
                {
                    "key": "Country",
                    "value": country,
                }
            ],
            "dateCreationStory": this.items[0].dateCreationStory,
            "dateLastUpdate": Date.now(),
            "authorId": this.items[0].authorId,
            "editorId": this.items[0].editorId,
            "title": title,
            "status": "1",
            "content": content,
            "summary": summary,
            "price": price,
            "thumbnail": "thumbnail",
            "_id":id
        };
        
        var url = 'http://127.0.0.1:3000/api/story/update/' + id;
        var req = {
            method: 'PUT',
            url: url,
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
     var items = [];
     var id = $routeParams.id;
     var url = 'http://127.0.0.1:3000/api/story/show/'+id;
     
    $http({method: 'GET', url: url}).then(function successCallback(response){
        
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

