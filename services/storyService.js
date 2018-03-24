'use strict';

angular.
	module('newsApp')
	.factory('storyService', ['$http', '$httpParamSerializerJQLike', 'APIConfig', 'sessionService', 'StatusStory', function ($http, $httpParamSerializerJQLike, APIConfig, sessionService, StatusStory) {
		return {
			
			FiltersByStatus: function(Storys,id_Filter){
				var storiesFiltred = [];
				angular.forEach(Storys, function(Story, key) {
					if(Story.status === id_Filter){
						storiesFiltred.push(Story);
					}
				  }, log);
				return storiesFiltred;
			},

			feedStory: function (scope) {
				var stories = [];
				var log = [];
				/*** Func to call API login to back-end ***/
				var req = {
					method: 'GET',
					url: APIConfig.url + '/story/feed/',
					headers: {
						'Authorization' : 'Bearer ' + sessionService.get('token')
					 }
				};
				$http(req).then(function successCallback(response) {
					angular.forEach(response.data, function (value, key) {
						value.status = StatusStory[value.status];
						stories.push(value);
					}, log);
				}, function errorCallback(response) {
					console.log("error");
				});
				/*** end Func ***/
				scope.stories = stories;
				return stories;
			},

			getStoryById: function (scope, id) {
				var item = {};
				/*** Func to call API login to back-end ***/
				var req = {
					method: 'GET',
					url: APIConfig.url + '/story/show/' + id,
					headers: {
						'Authorization' : 'Bearer ' + sessionService.get('token')
					 }
				};
				$http(req).then(function successCallback(response) {
					var value = response.data;
					value.status = StatusStory[value.status];
					scope.story = value;
				}, function errorCallback(response) {
					console.log("error");
				});
				/*** end Func ***/

				return item;
			},
			addStory: function (new_story, location, scope) {
				var thumbnail = document.getElementById('thumb2').value;
				var content = CKEDITOR.instances.editor1.getData();
				//var country = document.getElementById("select2-country");
				function getSelectValues(select) {
					var result = [];
					var options = select && select.options;
					var opt;
				  
					for (var i=0, iLen=options.length; i<iLen; i++) {
					  opt = options[i];
				  
					  if (opt.selected) {
						result.push(opt.value || opt.text);
					  }
					}
					return result;
				  }
				var temp = document.getElementsByTagName('select')[0];
				var temp2 = document.getElementsByTagName('select')[1];
				var selected_country = getSelectValues(temp);
				var selected_sector = getSelectValues(temp2);

				//console.log('textarea',content);

				//console.log('select2-country',selected_sector);


				var story = {
					"tags": [
						{
							"key": "sector",
							"value": selected_sector.toString(),
						},
						{
							"key": "country",
							"value": selected_country.toString(),
						}
					],
					"dateCreationStory": Date.now(),
					"dateLastUpdate": Date.now(),
					"authorId": "5aa3148a268d9b158e3a068c",
					"editorId": "5aa3148a268d9b158e3a068c",
					"title": new_story.title,
					"status": "1",
					"content": content,
					"summary": new_story.summary,
					"price": new_story.price,
					"thumbnail": thumbnail,
				};
				console.log('story',story);
				var req = {
					method: 'POST',
					url: APIConfig.url + '/story/add/',
					data: $httpParamSerializerJQLike(story),
					headers: {
						'Authorization' : 'Bearer ' + sessionService.get('token')
					 }
				};
				$http(req).then(function successCallback(response) {
					scope.taskStatus = true;
					scope.taskMsg = "success add Story ";
					location.path("/");
				}, function errorCallback(response) {
					console.log(response);
					scope.taskStatus = false;
					scope.taskMsg = "error to add Story !";
				});
			},

			updateStory: function (id, new_story, story) {
				var title = new_story.title ? new_story.title : story.title;
				var sector = new_story.sector ? new_story.sector : story.sector;
				var country = new_story.country ? new_story.country : story.country;
				var content = new_story.content ? new_story.content : story.content;
				var summary = new_story.summary ? new_story.summary : story.summary;
				var price = new_story.price ? new_story.price : story.price;
				var thumbnail = document.getElementById('thumb2').value;
				var story = {
					"tags": [
						{
							"key": "sector",
							"value": sector,
						},
						{
							"key": "country",
							"value": country,
						}
					],
					"dateCreationStory": story.dateCreationStory,
					"dateLastUpdate": Date.now(),
					"authorId": "5aa3148a268d9b158e3a068c",
					"editorId": "5aa3148a268d9b158e3a068c",
					"title": title,
					"status": "1",
					"content": content,
					"summary": summary,
					"price": price,
					"thumbnail": thumbnail,
					"_id": id
				};
				console.log(sessionService.get('token'));
				var url = APIConfig.url + '/story/update/' + id;
				var req = {
					method: 'PUT',
					url: url,
					data: $httpParamSerializerJQLike(story),
					headers: {
						'Authorization' : 'Bearer ' + sessionService.get('token')
					 }
				};
				$http(req).then(function successCallback(response) {
					console.log(response.data);
				}, function errorCallback(response) {
					console.log(response.data);
				});
			},
			deleteStory: function (id) {

			}


		}
	}]);
