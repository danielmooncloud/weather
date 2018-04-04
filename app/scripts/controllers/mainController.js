

const MainController = ($scope, weatherService) => {
	
	
	const handleError = (err) => {
		if(err.data == "Cannot read property 'geometry' of undefined") {
			$scope.error = "Invalid location. Please try again";
		} else {
			$scope.error = "Oops! Something went wrong. Please refresh and try again.";
		}
	};


	$scope.clearErrorBox = () => {
		$scope.error = "";
		$scope.query = "";
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
			const query = $scope.query.split(" ").join("");
			if(parseInt(query) && query.length === 5) {
				getWeatherData("api/search", `components=postal_code:${query}`);
			} else {
				getWeatherData("api/search", `address=${query}&components=country:US`);
			}
		}
	};


	const getWeatherData = async (url, location) => {
		try {
			$scope.isLoading = true;
			const weatherData = await weatherService.getWeather(url, location);
			displayWeather(weatherData);
		} catch(err) {
			handleError(err);
		} finally {
			$scope.isLoading = false;
		}
	};


	getWeatherData("/api/current");
	
};

export default MainController;