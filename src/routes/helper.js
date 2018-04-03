const https = require('https');
const key1 = "AIzaSyBq5sH5ZGsj21YvMM8i1G0d_ZcGds7Ll4I"//process.env.GOOGLE_API_KEY;
const key2 = "efc9eb6642cbfb5aa7be713b8a9ab9de"//process.env.DARKSKY_API_KEY;



//Gathers and returns response data
const getData = (url) => {
	console.log(url);
	return new Promise((resolve, reject) =>
		https.get(url, response => {
			let body = "";
			response
				.on("data", chunk => body += chunk)
				.on("end", () => {
					if(response.statusCode === 200) {
						body = JSON.parse(body);
						resolve(body);
					} else {
						const err = new Error("Oops! Something went wrong.");
						err.status = response.statusCode;
						reject(err);
					}
				})
		}).on("error", reject)
	)
}


//Gets weather data based on IP Address
const getWeather = async (req, res, next) => {
	try {
		let { latitude, longitude } = req.body;
		let weatherData = await getData(`https://api.darksky.net/forecast/${key2}/${latitude},${longitude}`);
		res.send(weatherData);
	} catch(err) {
		next(err);
	}
}


//Gets weather Data based on search query
const getLocationFromSearch = async (req, res, next) => {
	try {
		let location = req.body.location;
		//Gets coordinates from search query
		let locationData = await getData(`https://maps.googleapis.com/maps/api/geocode/json?${location}&key=${key1}`);
		//Checks to make sure location exists
		if(locationData.results[0]) {
			let { lat, lng } = locationData.results[0].geometry.location;
			//Get City and State from coords
			locationData = await getData(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key1}`);
			//Get weather data from coords
			let weatherData = await getData(`https://api.darksky.net/forecast/${key2}/${lat},${lng}`);
			res.send({
				city: locationData.results[0].address_components[3].long_name,
				state: locationData.results[0].address_components[5].long_name,
				...weatherData
			});
		} else {
			throw new Error("Invalid Location.");
		}
	} catch(err) {
		next(err);
	}
}


module.exports = { getWeather, getWeatherFromSearch };


