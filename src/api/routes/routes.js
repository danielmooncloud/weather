'use strict';


var express = require('express');
var https = require('https');

var router = express.Router();


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