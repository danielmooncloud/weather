'use strict';

var angular = require('angular');
var ngRoute = require('angular-route');
var ngSanitize = require('angular-sanitize');


var app = angular.module('weatherApp', [ngRoute, ngSanitize, "angular-skycons"]);


app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html' 
		})
		.when('/daily', {
			templateUrl: 'views/daily.html'
		})
		.when('/hourly', {
			templateUrl: 'views/hourly.html'
		})
		.otherwise({
			redirectTo: '/'
		}); 
	
}) 

require('./scripts/controllers/MainController.js');
require('./scripts/services/weatherService.js');
require('./scripts/directives/degreeFilter.js');
require('./scripts/directives/search.js');
