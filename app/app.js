import angular from "angular";
import ngRoute from "angular-route";
import ngSanitize from "angular-sanitize";
import AppConfig from "./scripts/config/AppConfig.js";
import MainController from "./scripts/controllers/mainController.js";
import weatherService from "./scripts/services/weatherService.js";
import degreeFilter from "./scripts/directives/degreeFilter.js";
import keypress from "./scripts/directives/keypress.js";
import loader from "./scripts/directives/loader.js";
import handleError from "./scripts/directives/handleError.js";

import "./scss/application.crit.scss";
import "./scss/application.med.scss";


angular.module("weatherApp", [ngRoute, ngSanitize, "angular-skycons"])
	.config(["$locationProvider", "$routeProvider", AppConfig])
	.service("weatherService", ["$http", weatherService])
	.filter("degreeFilter", degreeFilter)
	.directive("onKeypress", keypress)
	.directive("loader", ["$interval", loader])
	.directive("handleError", handleError)
	.controller("MainController", ["$scope", "weatherService", MainController]);
	



