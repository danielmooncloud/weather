

function weatherService($http) {

	this.getWeather = (url, location) => {
		if(location) return $http.post(url, { location });
		return new Promise(resolve => {
			navigator.geolocation.getCurrentPosition(position => {
				const { latitude: lat, longitude: lng } = position.coords;
				resolve($http.post(url, { lat, lng }));
			});
		});
	};
	
}

export default weatherService;
