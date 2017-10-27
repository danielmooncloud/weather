'use strict';


const express = require('express');
const https = require('https');
const router = express.Router();
const key1 = process.env.GOOGLE_API_KEY;
const key2 = process.env.DARKSKY_API_KEY;


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
		let weatherData = await getData(`https://api.darksky.net/forecast/${key2}/${locationData.latitude},${locationData.longitude}`);
		res.send({ ...locationData,...weatherData });
	} catch(e) {
		next(e);
	}
}


//Gets weather Data based on search query
const getWeatherFromSearch = async (req, res, next) => {
	try {
		let locationData = await getData(`https://maps.googleapis.com/maps/api/geocode/json?${req.body.location}&key=${key1}`);
		let {lat, lng} = locationData.results[0].geometry.location;

		//Get City and State based on Lat/Lon
		locationData = await getData(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key1}`);
		let weatherData = await getData(`https://api.darksky.net/forecast/${key2}/${lat},${lng}`);
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









