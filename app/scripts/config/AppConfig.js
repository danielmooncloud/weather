

const AppConfig = ($locationProvider, $routeProvider) => {
	$locationProvider.hashPrefix("");
	$routeProvider
		.when("/", { templateUrl: "views/main.html" })
		.when("/daily", { templateUrl: "views/daily.html"})
		.when("/hourly", { templateUrl: "views/hourly.html"})
		.otherwise({ redirectTo: "/"});
};


export default AppConfig;