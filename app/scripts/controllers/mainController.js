'use strict';

var angular = require('angular');

angular.module('weatherApp').controller('MainController', function($scope, weatherService) {
	
	$scope.degree = '&#176;';
	$scope.color = '#83a1d1';
	$scope.iconSize = {
		'big' : 200,
		'small' : 100
	}

	$scope.search = '';

	$scope.enter = e => {
		if(e.which === 13) {
			$scope.search = $scope.search.split(' ').join('');
			if(zipCode($scope.search)) {
				$scope.parameters = 'components=postal_code:' + $scope.search;
			} else if($scope.search !== '' && !zipCode($scope.search)) {
				$scope.parameters = 'address=' + $scope.search + '&components=country:US';
			}
			getWeatherData();
		}
	}

	const zipCode = (search) => {
		if(typeof parseInt(search) === 'number' && search.length === 5) {
			return true;
		} else {
			return false;
		}
	}

	const locationIP = response => {
		if(response.status === 200) {
			let locationData = response.data;
			$scope.location = {
				"city" : locationData.city,
				"state" : locationData.regionName
			}
			let weatherObject = {
				"lat": response.data.lat,
				"lon": response.data.lon
			}
			return weatherObject; 
		} else {
			console.log(response.status + ": There was an error getting your location coordinates")
		}
	}

	const location = response => {

		if(response.status === 200) {
			let locationData = response.data;
			if(zipCode($scope.search)) {
				$scope.location = {
					"city" : locationData.results[0].address_components[1].long_name,
					"state" : locationData.results[0].address_components[3].long_name
				}
			
			} else {
				$scope.location = {
				"city" : locationData.results[0].address_components[0].long_name,
				"state" : locationData.results[0].address_components[2].long_name
				}
			}
			
			let weatherObject = {
				"lat": response.data.results[0].geometry.location.lat,
				"lon": response.data.results[0].geometry.location.lng
			}
			return weatherObject; 
		} else {
			console.log(response.status + ": Connection error")
		}
	}
		
	const weather = response => {
		if(response.status === 200) {
			$scope.weather = JSON.parse(response.data);
			$scope.daily = $scope.weather.daily.data;
			$scope.hourly = $scope.weather.hourly.data;
		} else {
			console.log("There was an error getting the weather Data for this location")
		}
		
	}


	function getWeatherData() { 		
		if($scope.search === '') {
			let locationURL = weatherService.ipLocationUrl;
			weatherService.getWeather(locationIP, weather, locationURL);
		} else {		
			let locationURL = weatherService.locationUrl[0] + $scope.parameters + weatherService.locationUrl[1]
			weatherService.getWeather(location, weather, locationURL);
		} 				
	}

	getWeatherData();
})


//"darkSkyAPI": "https://api.darksky.net/forecast/"
//"dsKey": "efc9eb6642cbfb5aa7be713b8a9ab9de"

