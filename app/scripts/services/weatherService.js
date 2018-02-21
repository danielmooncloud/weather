

function weatherService($http) {

	this.getWeather = (location) => {
		return location ?  $http.post("/api/search", {location}) : $http.get("/api/ip");
	};
}

export default weatherService;



