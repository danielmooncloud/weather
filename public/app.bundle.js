webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module('weatherApp').controller('MainController', function ($scope, weatherService) {
	var _this = this;

	$scope.search = '';

	$scope.enter = function (e) {
		if (e.which === 13) {
			var search = $scope.search.split(' ').join('');
			var location = zipCode(search) ? 'components=postal_code:' + search : 'address=' + search + '&components=country:US';
			_this.getWeatherFromSearch(location, weather);
		}
	};

	var zipCode = function zipCode(search) {
		if (typeof parseInt(search) === 'number' && search.length === 5) {
			return true;
		} else {
			return false;
		}
	};

	var locationFromIP = function locationFromIP(response) {
		if (response.status === 200) {
			var locationData = response.data;
			$scope.location = {
				"city": locationData.city,
				"state": locationData.regionName
			};
			var weatherObject = {
				"lat": response.data.latitude,
				"lon": response.data.longitude
			};
			return weatherObject;
		} else {
			console.log(response.status + ": There was an error getting your location coordinates");
		}
	};

	var locationFromSearch = function locationFromSearch(response) {

		if (response.status === 200) {
			var locationData = response.data;
			if (zipCode($scope.search)) {
				$scope.location = {
					"city": locationData.results[0].address_components[1].long_name,
					"state": locationData.results[0].address_components[3].long_name
				};
			} else {
				$scope.location = {
					"city": locationData.results[0].address_components[0].long_name,
					"state": locationData.results[0].address_components[2].long_name
				};
			}

			var weatherObject = {
				"lat": response.data.results[0].geometry.location.lat,
				"lon": response.data.results[0].geometry.location.lng
			};
			return weatherObject;
		} else {
			console.log(response.status + ": Connection error");
		}
	};

	var displayWeather = function displayWeather(response) {
		if (response.status === 200) {
			$scope.city = response.data.city;
			$scope.state = response.data.region;
			$scope.current = response.data.currently;
			$scope.daily = response.data.daily.data;
			$scope.hourly = response.data.hourly.data;
		} else {
			console.log("There was an error getting the weather Data for this location");
		}
	};

	function getWeatherData() {
		var locationURL = $scope.search ? 'https://maps.googleapis.com/maps/api/geocode/json?' + $scope.parameters + '&key=AIzaSyBq5sH5ZGsj21YvMM8i1G0d_ZcGds7Ll4I' : 'https://ipapi.co/json';
		var getLocation = $scope.search ? locationFromSearch : locationFromIP;
		weatherService.getWeather(getLocation, getWeather, locationURL);
	}

	//getWeatherData();
	weatherService.getWeatherFromIP(displayWeather);
});

//"darkSkyAPI": "https://api.darksky.net/forecast/"
//"dsKey": "efc9eb6642cbfb5aa7be713b8a9ab9de"

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module('weatherApp').filter('toCelsius', function () {
	return function (number) {
		return Math.floor(5 / 9 * (number - 32));
	};
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module('weatherApp').directive('onKeypress', function () {
	return {
		scope: {
			handler: '&onKeypress'
		},
		link: function link(scope, element) {
			element.bind('keypress', function (e) {
				scope.handler({ $event: e });
			});
		}
	};
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module('weatherApp').service('weatherService', function ($http) {

	// const logError = error => console.log('error: ' + error.data.err.message);

	// this.getWeather = (firstCallback, secondCallback, url) => {

	// 	$http.get(url)
	// 		.then(firstCallback)
	// 		.then(function(object) {
	// 			return $http.post('/api', object).catch(logError);
	// 		})
	// 		.then(secondCallback)
	// 		.catch(logError) 

	// } 

	this.getWeatherFromIP = function (callback) {
		return $http.get("/api/ip").then(callback);
	};

	this.getWeatherFromSearch = function (location, callback) {
		$http.post("/api/search", { location: location }).then(callback).catch(logError);
	};
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);
var ngRoute = __webpack_require__(1);
var ngSanitize = __webpack_require__(2);
__webpack_require__(3);

var app = angular.module('weatherApp', [ngRoute, ngSanitize, "angular-skycons"]);

app.config(function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/main.html'
	}).when('/daily', {
		templateUrl: 'views/daily.html'
	}).when('/hourly', {
		templateUrl: 'views/hourly.html'
	}).otherwise({
		redirectTo: '/'
	});
});

__webpack_require__(4);
__webpack_require__(7);
__webpack_require__(5);
__webpack_require__(6);

/***/ })
],[8]);