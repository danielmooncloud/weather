webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);
	var ngRoute = __webpack_require__(3);
	var ngSanitize = __webpack_require__(5);

	var app = angular.module('weatherApp', [ngRoute, ngSanitize, 'angular-skycons'])


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

	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

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



/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('weatherApp').service('weatherService', function($http) {

		this.ipLocationUrl = 'http://ip-api.com/json';

		this.locationUrl = ['https://maps.googleapis.com/maps/api/geocode/json?', '&key=AIzaSyBq5sH5ZGsj21YvMM8i1G0d_ZcGds7Ll4I'];

		const logError = error => console.log('error: ' + error.data.err.message);
		
		this.getWeather = (firstCallback, secondCallback, url) => {
			
			$http.get(url)
				.then(firstCallback)
				.then(function(object) {
					return $http.post('/api', object).catch(logError);
				})
				.then(secondCallback)
				.catch(logError) 
			
		} 
	})



/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('weatherApp').filter('toCelsius', function() {
		return function(number) {
			return Math.floor((5/9) * (number - 32));
		}
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('weatherApp').directive('onKeypress', function() {
		return {
			scope: {
				handler: '&onKeypress'
			},
			link: function(scope, element) {
				element.bind('keypress', function(e) {
					scope.handler({$event: e});
				})
			}
		}
	})

/***/ }
]);