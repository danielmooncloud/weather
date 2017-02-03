'use strict';

var angular = require('angular');

angular.module('weatherApp').directive('onKeypress', function() {
	return {
		scope: {
			handler: '&onKeypress'
		},
		link: function(scope, element) {
			element.bind('keypress', function(e) {
				scope.handler({$event: e});
			})
		}
	}
})