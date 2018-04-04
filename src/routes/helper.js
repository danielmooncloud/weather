const https = require('https');
const key1 = "AIzaSyBq5sH5ZGsj21YvMM8i1G0d_ZcGds7Ll4I"//process.env.GOOGLE_API_KEY;
const key2 = "efc9eb6642cbfb5aa7be713b8a9ab9de"//process.env.DARKSKY_API_KEY;



//Gathers and returns response data
const getData = (url) => {
	return new Promise((resolve, reject) =>
		https.get(url, response => {
			let body = "";
			response
				.on("data", chunk => body += chunk)
				.on("end", () => {
					try {
						body = JSON.parse(body);
						resolve(body);
					} catch(err) {
						reject(err);
					}	
				})
		}).on("error", reject)
	)
}


const getWeatherData = async location => {
	try {
		const { lat, lng } = location;
		const locationData = await getData(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key1}`);
		const weatherData = await getData(`https://api.darksky.net/forecast/${key2}/${lat},${lng}`);
		return {
			city: locationData.results[0].address_components[3].long_name,
			state: locationData.results[0].address_components[5].long_name,
			...weatherData
		}
	} catch(err) {
		throw(err);
	}
}


//Gets weather data based on IP Address
const getCurrentWeather = async (req, res, next) => {
	try {
		const weatherData = await getWeatherData(req.body);
		res.send(weatherData);
	} catch(err) {
		next(err);
	}
}



//Gets weather Data based on search query
const getWeatherFromSearch = async (req, res, next) => {
	try {
		let location = req.body.location;
		//Gets coordinates from search query
		const locationData = await getData(`https://maps.googleapis.com/maps/api/geocode/json?${location}&key=${key1}`);
		//Checks to make sure location exists
		location = locationData.results[0].geometry.location;
		//Get City and State from coords
		let weatherData = await getWeatherData(location);
		res.send(weatherData);
	} catch(err) {
		next(err);
	}
}



module.exports = { getCurrentWeather, getWeatherFromSearch };


