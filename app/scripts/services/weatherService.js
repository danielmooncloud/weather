

function weatherService($http) {

	this.getWeatherFromIP = (callback, errorHandler) => 
		$http.get("/api/ip")
			.then(callback, errorHandler);

	this.getWeatherFromSearch = (location, callback, errorHandler) => 
		$http.post("/api/search", {location})
			.then(callback, errorHandler);
}

export default weatherService;



