app.controller('DayController', function($scope, weatherService, locationService) {

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
		var data = JSON.parse(response.data);
		$scope.daily = data.daily.data;
	})

})