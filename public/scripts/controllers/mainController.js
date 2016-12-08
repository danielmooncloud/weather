app.controller('MainController', function($scope, $routeParams, weatherService, locationService) {
	
	$scope.degree = '&#176;';
	$scope.color = '#83a1d1';
	$scope.iconSize = {
		'big' : 200,
		'small' : 100
	};


	locationService.getLocation(function(response) {
		$scope.location = response.data;	
	}); 

	weatherService.getWeather(function(response) {
		$scope.weather = JSON.parse(response.data);
	})
})




//"darkSkyAPI": "https://api.darksky.net/forecast/"
//"dsKey": "efc9eb6642cbfb5aa7be713b8a9ab9de"

