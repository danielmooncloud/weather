
var app = angular.module('weatherApp', ['angular-skycons', 'ngSanitize', 'ngRoute'])


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

