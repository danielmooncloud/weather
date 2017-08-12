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


const getWeatherData = async (req, res, next) => {
	let locationURL = req.body.location ? 
		`https://maps.googleapis.com/maps/api/geocode/json?${req.body.location}&key=AIzaSyBq5sH5ZGsj21YvMM8i1G0d_ZcGds7Ll4I` :
		"https://ipapi.co/json"
	
	try {
		let locationData = await getData(locationURL);
		console.log(locationData);
		let weatherData = await getData(`https://api.darksky.net/forecast/efc9eb6642cbfb5aa7be713b8a9ab9de/${locationData.latitude},${locationData.longitude}`);
		res.send({
			...locationData,
			...weatherData
		});
	} catch(e) {
		next(e);
	}
}




router.get("/ip", (req, res, next) => {
	getWeatherData(req, res, next);
})

router.post("/search", (req, res, next) => {
	getWeatherData(req, res, next);
})


module.exports = router;