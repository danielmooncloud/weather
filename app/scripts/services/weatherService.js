

function weatherService($http) {

	this.getWeather = (url, location) => {
		return $http.post(url, { location });
	};

	this.getCurrentWeather = url => {
		return new Promise(resolve => {
			navigator.geolocation.getCurrentPosition(position => {
				let { latitude, longitude } = position.coords;
				resolve($http.post(url, { latitude, longitude }));
			});
		})
	}
}

export default weatherService;



