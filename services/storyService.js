'use strict';

angular.
	module('newsApp')
	.factory('storyService', ['$http', '$httpParamSerializerJQLike', 'APIConfig', function ($http, $httpParamSerializerJQLike, APIConfig) {
		return {
			feedStory: function (scope) {
				var stories = [];
				var log = [];
				/*** Func to call API login to back-end ***/
				var req = {
					method: 'GET',
					url: APIConfig.url + '/story/feed/'
				};
				$http(req).then(function successCallback(response) {
					angular.forEach(response.data, function (value, key) {
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

			getStoryById: function (scope, id) {
				//console.log('id ***',id)
				var item = {};
				/*** Func to call API login to back-end ***/
				var req = {
					method: 'GET',
					url: APIConfig.url + '/story/show/' + id
				};
				$http(req).then(function successCallback(response) {

					var value = response.data;				
					document.getElementById('img').setAttribute('src', value.thumbnail);
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
						"thumbnail": 'image',
						"__v": 0
					};
					scope.story = item;
				}, function errorCallback(response) {
					console.log("error");
				});
				/*** end Func ***/

				return item;
			},

			

			addStory: function (new_story) {
				var thumbnail = document.getElementById('thumb2').value;
				var story = {
					"tags": [
						{
							"key": "Topic",
							"value": new_story.topicsTag,
						},
						{
							"key": "Country",
							"value": new_story.countriesTag,
						}
					],
					"dateCreationStory": Date.now(),
					"dateLastUpdate": Date.now(),
					"authorId": "5aa3148a268d9b158e3a068c",
					"editorId": "5aa3148a268d9b158e3a068c",
					"title": new_story.title,
					"status": "1",
					"content": new_story.content,
					"summary": new_story.summary,
					"price": new_story.price,
					"thumbnail": thumbnail,
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
			},


			updateStory: function (id, new_story,story) {
				var title = new_story.title ? new_story.title : story.title;
				var sector =new_story.sector ? new_story.sector: story.sector;
				var country = new_story.country ? new_story.country: story.country;
				var content = new_story.content ? new_story.content: story.content;
				var summary = new_story.summary ? new_story.summary: story.summary;
				var price = new_story.price ? new_story.price: story.price;
				var thumbnail = document.getElementById('thumb2').value;
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
					"dateCreationStory":story.dateCreationStory,
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

				var url = 'http://127.0.0.1:3000/api/story/update/' + id;
				var req = {
					method: 'PUT',
					url: url,
					data: $httpParamSerializerJQLike(story),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						
					},
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
