
var app = angular.module('weatherApp', ['angular-skycons', 'ngSanitize', 'ngRoute'])


app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'MainController',
			templateUrl: 'views/main.html' 
		})
		.when('/daily', {
			controller: 'DayController',
			templateUrl: 'views/daily.html'
		})
		.when('/hourly', {
			controller: 'HourController',
			templateUrl: 'views/hourly.html'
		})
		.when('/test/', {
			controller: 'SearchController',
			templateUrl: 'views/test.html'
		})
		.otherwise({
			redirectTo: '/'
		}); 
}) 

