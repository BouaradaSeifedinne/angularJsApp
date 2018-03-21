'use strict';

angular.
    module('newsApp')
    .directive('loginDirective', function() {
	return { 
		templateUrl: "views/login/login.tpl.html"
	}
});