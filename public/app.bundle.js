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

	var zipCode = function zipCode(search) {
		if (typeof parseInt(search) === 'number' && search.length === 5) {
			return true;
		} else {
			return false;
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

	$scope.enter = function (e) {
		if (e.which === 13) {
			var search = $scope.search.split(' ').join('');
			var location = zipCode(search) ? 'components=postal_code:' + search : 'address=' + search + '&components=country:US';
			weatherService.getWeatherFromSearch(location, displayWeather);
		}
	};

	weatherService.getWeatherFromIP(displayWeather);
});

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

	this.getWeatherFromIP = function (callback) {
		return $http.get("/api/ip").then(callback);
	};

	this.getWeatherFromSearch = function (location, callback) {
		$http.post("/api/search", { location: location }).then(callback);
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