'use strict';

var angular = require('angular');

angular.module('weatherApp').service('weatherService', function($http) {

	this.getWeatherFromIP = (callback) =>
		$http.get("/api/ip").then(callback);

	this.getWeatherFromSearch = (location, callback) => {
		$http.post("/api/search", {location})
			.then(callback)
	}
})



