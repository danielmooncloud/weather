

const MainController = ($scope, weatherService) => {
	

	const handleError = (err) => {
		$scope.message = err.data.err.message;
		$scope.$apply();
	};


	$scope.clearErrorBox = () => {
		$scope.message = "";
		$scope.search = "";
	};


	const displayWeather = (response) => {
		const { city, state, currently, daily, hourly } = response.data;
		$scope.city = city;
		$scope.state = state;
		$scope.current = currently;
		$scope.daily = daily.data;
		$scope.hourly = hourly.data;
		$scope.$apply();
	}; 
	

	$scope.search = (e) => {
		if(e.which === 13) {
			//remove spaces from the search value
			const query = $scope.query.split(" ").join("");
			let location;
			//Is the search value a zipcode?
			if(parseInt(query) && query.length === 5) {
				location = `components=postal_code:${query}`;
			} else {
				location = `address=${query}&components=country:US`;
			}
			getWeatherData(location);
		}
	};

	const getCurrentLocationData = async () => {
		try {
			const weatherData = await weatherService.getCurrentWeather("/api/current");
			displayWeather(weatherData);
		} catch(err) {
			handleError(err);
		}
	}


	const getWeatherData = async (location) => {
		try {
			const weatherData = await weatherService.getWeather("api/search", location);
			displayWeather(weatherData);
		} catch(err) {
			handleError(err);
		}
	};

	getCurrentLocationData();

	
};

export default MainController;