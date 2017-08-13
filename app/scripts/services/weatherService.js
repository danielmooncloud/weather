

function weatherService($http) {

	this.getWeatherFromIP = (callback) => {
		$http.get("/api/ip").then(callback);
	}

	this.getWeatherFromSearch = (location, callback) => {
		$http.post("/api/search", {location}).then(callback);
	}
}

export default weatherService;



