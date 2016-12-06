app.controller('MainController', function($scope, weatherService, locationService) {
	
	var locationCallback = function(response) {
		var data = response.data;
		
		$scope.location = {
			"city": data.city,
			"state": data.regionName,
			"country": data.countryCode,
			"lat": data.lat,
			"lon": data.lon
		}
		
	}

	locationService.getLocation(locationCallback); 

	var weatherCallback = function(response) {
		var data = JSON.parse(response.data);
		$scope.daily = data.daily.data;
		$scope.hourly = data.hourly.data;

		$scope.weather = {
			"temperature" : data.currently.temperature,
			"description" : data.currently.summary,
			"time" : data.currently.time,
			"degree" : '&#176;',
			"icon" : data.currently.icon,
			"color" : '#83a1d1',
			"size" : {
				"big" : 200,
				"small" : 100
			}
		}


	}
	
	weatherService.getWeather(weatherCallback)
})

//"darkSkyAPI": "https://api.darksky.net/forecast/"
//"dsKey": "efc9eb6642cbfb5aa7be713b8a9ab9de"




