'use strict';


const express = require('express');
const https = require('https');
const router = express.Router();


//HELPER FUNCTIONS

//Gathers and returns response data
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
						const err = new Error("Location Not Found.");
						err.status = response.statusCode;
						reject(err);
					}
				})
		}).on("error", err => {
			reject(err);
		})
	);



//Gets weather data based on IP Address
const getWeatherFromIP = async (req, res, next) => {
	try {
		let locationData = await getData("https://ipapi.co/json");
		let weatherData = await getData(`https://api.darksky.net/forecast/efc9eb6642cbfb5aa7be713b8a9ab9de/${locationData.latitude},${locationData.longitude}`);
		res.send({
			...locationData,
			...weatherData
		});
	} catch(e) {
		next(e);
	}
}


//Gets weather Data based on search query
const getWeatherFromSearch = async (req, res, next) => {
	try {
		let locationData = await getData(`https://maps.googleapis.com/maps/api/geocode/json?${req.body.location}&key=AIzaSyBq5sH5ZGsj21YvMM8i1G0d_ZcGds7Ll4I`);
		let {lat, lng} = locationData.results[0].geometry.location;

		//Get City and State based on Lat/Lon
		locationData = await getData(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBq5sH5ZGsj21YvMM8i1G0d_ZcGds7Ll4I`);
		let weatherData = await getData(`https://api.darksky.net/forecast/efc9eb6642cbfb5aa7be713b8a9ab9de/${lat},${lng}`);
		res.send({
			city: locationData.results[0].address_components[2].long_name,
			state: locationData.results[0].address_components[4].long_name,
			...weatherData
		});
	} catch(e) {
		next(e);
	}
}




//ROUTES

router.get("/ip", (req, res, next) => {
	getWeatherFromIP(req, res, next);
})

router.post("/search", (req, res, next) => {
	getWeatherFromSearch(req, res, next);
})


module.exports = router;









