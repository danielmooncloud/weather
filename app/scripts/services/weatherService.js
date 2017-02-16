'use strict';

var angular = require('angular');

angular.module('weatherApp').service('weatherService', function($http) {

	this.ipLocationUrl = 'https://ipapi.co/json';

	this.locationUrl = ['https://maps.googleapis.com/maps/api/geocode/json?', '&key=AIzaSyBq5sH5ZGsj21YvMM8i1G0d_ZcGds7Ll4I'];

	const logError = error => console.log('error: ' + error.data.err.message);
	
	this.getWeather = (firstCallback, secondCallback, url) => {
		
		$http.get(url)
			.then(firstCallback)
			.then(function(object) {
				return $http.post('/api', object).catch(logError);
			})
			.then(secondCallback)
			.catch(logError) 
		
	} 
})

