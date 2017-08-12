'use strict';


var express = require('express');
var https = require('https');

var router = express.Router();

const getData = (url) =>
	new Promise((resolve, reject) =>
		https.get(url, response => {
			let body = "";
			response
				.on("data", chunk => body += chunk)
				.on("end", () => {
					if(response.statusCode === 200) {
						body = JSON.parse(body);
						resolve(body);
					} else {
						reject(response.statusCode);
					}
				})
		}).on("error", reject)
	);


const getWeatherFromIP = async (req, res, next) => {
	try {
		let locationData = await getData("https://ipapi.co/json");
		let weatherData = await getData(`https://api.darksky.net/forecast/efc9eb6642cbfb5aa7be713b8a9ab9de/${locationData.latitude},${locationData.longitude}`);
		locationData = {
			...locationData,
			...weatherData
		}
		res.send(locationData);
	} catch(e) {
		next(e);
	}
}


router.get("/ip", (req, res, next) => {
	getWeatherFromIP(req, res, next);
})




router.post("/", function(req, res, next) {
	var lat = req.body.lat;
	var lon = req.body.lon;
	var weatherURL = 'https://api.darksky.net/forecast/efc9eb6642cbfb5aa7be713b8a9ab9de/';
	
	var req = https.get(weatherURL + lat + ',' + lon, function(response) {
		var body = '';
		response.on('data', function(chunk) {
			body += chunk;
		})
		response.on('end', function() {
			if(response.statusCode === 200) {
				res.json(body);
			} else {
				res.sendStatus(response.statusCode);
			}
		}).on("error", function(err) {
			return next(err);
		})
			
	}) 

})

module.exports = router;