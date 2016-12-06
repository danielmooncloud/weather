app.controller('MainController', function($scope, weatherService) {
	

	$scope.convert = false;

	
	weatherService.getWeather(function(response) {
		var data = JSON.parse(response.data);
		$scope.daily = data.daily.data;
		$scope.hourly = data.hourly.data;
		

		$scope.weather = {
			'temperature' : Math.floor(data.currently.temperature),
			'description' : data.currently.summary,
			'time' : data.currently.time,
			'icon' : data.currently.icon,
			'size' : {
				'big' : 200,
				'small' : 100
			},
			'color' : '#6982ef',
			'degree' : '&#176;',
			'daily' : data.daily.data
		}

	}) 
	
	weatherService.getLocation(function(response) {
		$scope.location = response.data;
	})
	

})

//"darkSkyAPI": "https://api.darksky.net/forecast/"
//"dsKey": "efc9eb6642cbfb5aa7be713b8a9ab9de"
//google locationServices key: "&key=AIzaSyBq5sH5ZGsj21YvMM8i1G0d_ZcGds7Ll4I"
//goolge API URL: 'http://maps.googleapis.com/maps/api/geocode/json?'




