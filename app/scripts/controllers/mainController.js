

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


	const handleError = (err) => {
		if(err.data.err.message == "Cannot read property 'geometry' of undefined") {
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
			startLoader();
			const weatherData = await weatherService.getWeather(url, location);
			displayWeather(weatherData);
		} catch(err) {
			handleError(err);
		} finally {
			stopLoader();
		}
	};


	getWeatherData("/api/current");
	
};

export default MainController;