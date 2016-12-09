app.controller('MainController', function($scope, weatherService) {
	
	$scope.zipCode = '';

	$scope.enter = function(e) {
		if(e.which === 13) {
			$scope.zipCode = $scope.search;
			getWeatherData();
		}
	}

	$scope.degree = '&#176;';
	$scope.color = '#83a1d1';
	$scope.iconSize = {
		'big' : 200,
		'small' : 100
	}

	var locationIP = function(response) {
		var locationData = response.data;
		$scope.location = {
			"city" : locationData.city,
			"state" : locationData.regionName
		}
		var weatherObject = {
			"lat": response.data.lat,
			"lon": response.data.lon
		}
		return weatherObject; 
	}

	var locationZip = function(response) {
		var locationData = response.data;
		$scope.location = {
			"city" : locationData.results[0].address_components[1].long_name,
			"state" : locationData.results[0].address_components[2].long_name
		}
		var weatherObject = {
			"lat": response.data.results[0].geometry.location.lat,
			"lon": response.data.results[0].geometry.location.lng
		}
		return weatherObject; 
	}

	var weather = function(response) {
		$scope.weather = JSON.parse(response.data);
		$scope.daily = $scope.weather.daily.data;
		$scope.hourly = $scope.weather.hourly.data;
	}

	function getWeatherData() { 
		if($scope.zipCode === '') {
			var locationURL = weatherService.ipLocationUrl;
			weatherService.getWeather(locationIP, weather, locationURL);
		} else if(typeof parseInt($scope.zipCode) === 'number' && $scope.zipCode.length === 5 ){
			var locationURL = weatherService.zipLocationUrl[0] + $scope.zipCode + weatherService.zipLocationUrl[1];
			weatherService.getWeather(locationZip, weather, locationURL);
		}						
	}

	getWeatherData();
	
	
})




//"darkSkyAPI": "https://api.darksky.net/forecast/"
//"dsKey": "efc9eb6642cbfb5aa7be713b8a9ab9de"

