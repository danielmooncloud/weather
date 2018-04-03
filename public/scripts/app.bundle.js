webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_route__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_route___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular_route__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_sanitize__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_sanitize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular_sanitize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scripts_config_AppConfig_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scripts_controllers_mainController_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__scripts_services_weatherService_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__scripts_directives_degreeFilter_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__scripts_directives_search_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__scss_application_crit_scss__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__scss_application_crit_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__scss_application_crit_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__scss_application_med_scss__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__scss_application_med_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__scss_application_med_scss__);











__WEBPACK_IMPORTED_MODULE_0_angular___default.a.module("weatherApp", [__WEBPACK_IMPORTED_MODULE_1_angular_route___default.a, __WEBPACK_IMPORTED_MODULE_2_angular_sanitize___default.a, "angular-skycons"]).config(["$locationProvider", "$routeProvider", __WEBPACK_IMPORTED_MODULE_3__scripts_config_AppConfig_js__["a" /* default */]]).service("weatherService", ["$http", __WEBPACK_IMPORTED_MODULE_5__scripts_services_weatherService_js__["a" /* default */]]).filter("degreeFilter", __WEBPACK_IMPORTED_MODULE_6__scripts_directives_degreeFilter_js__["a" /* default */]).directive("onKeypress", __WEBPACK_IMPORTED_MODULE_7__scripts_directives_search_js__["a" /* default */]).controller("MainController", ["$scope", "weatherService", __WEBPACK_IMPORTED_MODULE_4__scripts_controllers_mainController_js__["a" /* default */]]);

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const AppConfig = ($locationProvider, $routeProvider) => {
	$locationProvider.hashPrefix("");
	$routeProvider.when("/", { templateUrl: "views/main.html" }).when("/daily", { templateUrl: "views/daily.html" }).when("/hourly", { templateUrl: "views/hourly.html" }).otherwise({ redirectTo: "/" });
};

/* harmony default export */ __webpack_exports__["a"] = (AppConfig);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const MainController = ($scope, weatherService) => {

	const startLoader = () => {
		let i = 0;
		$scope.isLoading = true;
		$scope.loadingInterval = setInterval(() => {
			i = ++i % 4;
			$scope.loading = "Loading " + Array(i + 1).join(".");
			$scope.$apply();
		}, 800);
	};

	const stopLoader = () => {
		$scope.isLoading = false;
		clearInterval($scope.loadingInterval);
		$scope.$apply();
	};

	const handleError = err => {
		if (err.data.err.message == "Cannot read property 'geometry' of undefined") {
			$scope.message = "Invalid location. Please try again";
		} else {
			$scope.message = "Oops! Something went wrong. Please refresh and try again.";
		}
		$scope.$apply();
	};

	$scope.clearErrorBox = () => {
		$scope.message = "";
		$scope.query = "";
	};

	const displayWeather = response => {
		const { city, state, currently, daily, hourly } = response.data;
		$scope.city = city;
		$scope.state = state;
		$scope.current = currently;
		$scope.daily = daily.data;
		$scope.hourly = hourly.data;
		$scope.$apply();
	};

	$scope.search = e => {
		if (e.which === 13) {
			const query = $scope.query.split(" ").join("");
			if (parseInt(query) && query.length === 5) {
				getWeatherData("api/search", `components=postal_code:${query}`);
			} else {
				getWeatherData("api/search", `address=${query}&components=country:US`);
			}
		}
	};

	const getWeatherData = (() => {
		var _ref = _asyncToGenerator(function* (url, location) {
			try {
				startLoader();
				const weatherData = yield weatherService.getWeather(url, location);
				displayWeather(weatherData);
			} catch (err) {
				handleError(err);
			} finally {
				stopLoader();
			}
		});

		return function getWeatherData(_x, _x2) {
			return _ref.apply(this, arguments);
		};
	})();

	getWeatherData("/api/current");
};

/* harmony default export */ __webpack_exports__["a"] = (MainController);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


function weatherService($http) {

	this.getWeather = (url, location) => {
		if (location) return $http.post(url, { location });
		return new Promise(resolve => {
			navigator.geolocation.getCurrentPosition(position => {
				const { latitude: lat, longitude: lng } = position.coords;
				resolve($http.post(url, { lat, lng }));
			});
		});
	};
}

/* harmony default export */ __webpack_exports__["a"] = (weatherService);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const degreeFilter = () => {
	return number => {
		return Math.floor(5 / 9 * (number - 32));
	};
};

/* harmony default export */ __webpack_exports__["a"] = (degreeFilter);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const search = () => {
	return {
		scope: {
			handler: "&onKeypress"
		},
		link(scope, element) {
			element.bind("keypress", e => {
				scope.handler({ $event: e });
			});
		}
	};
};

/* harmony default export */ __webpack_exports__["a"] = (search);

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[3]);