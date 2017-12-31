

function weatherService($http) {

	this.getWeatherFromIP = (callback, errorHandler) => {
		return $http.get("/api/ip")
			.then(callback, errorHandler);
	}

	this.getWeatherFromSearch = (location, callback, errorHandler) => {
		return $http.post("/api/search", {location})
			.then(callback, errorHandler);
	}
}

export default weatherService;



