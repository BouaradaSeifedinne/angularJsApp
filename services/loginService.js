'use strict';

angular.
    module('newsApp')
    .factory('loginService',['$http','$httpParamSerializerJQLike' , 'APIConfig','sessionService' ,function($http, $httpParamSerializerJQLike,APIConfig,sessionService) {
    	return {
    		login: function(user,scope,rootScope,location){
    			/*** Func to call API login to back-end ***/

				var req = {
					method: 'POST',
					url: APIConfig.url+'/users/login/',
					data: $httpParamSerializerJQLike(user),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
				};

				$http(req).then(function successCallback(response) {
					rootScope.credentials = response.data;
					scope.error = "";
					rootScope.showHeaderFooter = true;
					sessionService.set('usrer',response.data.userId);
					sessionService.set('token',response.data.token);

/*
          if(response.data.userId === '5ab13fc374480036f26a69b8'){
            sessionService.set('role','reporter');
          }else{
            sessionService.set('role','member');
          }
*/
          //console.log(response.data.userId);

        			location.path("/");
				}, function errorCallback(response) {
				scope.error = response.data.error;
				});
			/*** end Func ***/
	    	},

	    	logout: function (location){
	    		sessionService.destroy('usrer');
					sessionService.destroy('token');
					console.log("logout");
	    		location.path("/login");
	    	},

        getUserCred: function (rootScope,location){
          var item = {};
          var req = {
    					method: 'GET',
    					url: APIConfig.url + '/users/profile/',
              headers: {
                'Authorization' : 'Bearer ' + sessionService.get('token')
             }
    				};
          $http(req).then(function successCallback(response) {
            //  UserC  = response.data;
              item.userFirstName = response.data.userFirstName;
              item.userLastName = response.data.userLastName;
              item.userEmail = response.data.userEmail;
              item.userLogin = response.data.userLogin;
              item.userStatus = response.data.userStatus;
              item._id = response.data._id;
              item.role = response.data.option[0].value;
							item.tags = response.data.tags;

              console.log(response.data);
            }, function errorCallback(response) {
                console.log(response,'error :');
                sessionService.destroy('usrer');
    		    		sessionService.destroy('token');
    		    		location.path("/login");
    				});
    				/*** end Func ***/

            //rootScope.userCred = UserC;
              return   item;
	    	},

        getUserCred1: function (rootScope){
          var item = [];
          var req = {
              method: 'GET',
              url: APIConfig.url + '/users/profile/',
              headers: {
                'Authorization' : 'Bearer ' + sessionService.get('token')
             }
            };
          $http(req).then(function successCallback(response) {
            //  UserC  = response.data;
              rootScope.UserC = response.data;
              item.push(response.data);
            }, function errorCallback(response) {
                console.log(response,'error :');
                sessionService.destroy('usrer');
                sessionService.destroy('token');
                location.path("/login");
            });
            /*** end Func ***/

            //rootScope.userCred = UserC;
              return   item;
        },



	    	isLogged:function(location){

				// verification a partir des var session local pas de session coté serveur
	    		if(sessionService.get('token')) return true;

	    		// a remplacer par une verification via un API is logged qui retourne un tocken
	    		// on doit verifier ce token avec celui est est enregistré dans la session local

	    		var token = sessionService.get('token');
	    		/*** Func to call API login to back-end ***/
				var req = {
					method: 'POST',
					url: APIConfig.url+'/users/isLogged/',
					data: $httpParamSerializerJQLike(token),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
				};

				$http(req).then(function successCallback(response) {
					if(sessionService.get('token') === response.data.token) return true;
					sessionService.destroy('usrer');
		    		sessionService.destroy('token');
		    		location.path("/login");
				}, function errorCallback(response) {
					sessionService.destroy('usrer');
		    		sessionService.destroy('token');
		    		location.path("/login");
				});
				/*** end Func ***/



	    	}

    	}
    }]);
