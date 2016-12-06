var express = require('express');
var https = require('https');
var port = process.env.PORT || 3000;
var jsonParser = require('body-parser').json;
var urlString = 'https://api.darksky.net/forecast/efc9eb6642cbfb5aa7be713b8a9ab9de/';


var app = express();

app.use(jsonParser());

app.use('/', express.static('public'));


app.post('/api', function(req, res) {
	var lat = req.body.lat;
	var lon = req.body.lon;
	var weatherURL = 'https://api.darksky.net/forecast/efc9eb6642cbfb5aa7be713b8a9ab9de/';
	
	var req = https.get(weatherURL + lat + ',' + lon, function(response) {
		var body = '';
		response.on('data', function(chunk) {
			body += chunk;
		})
		response.on('end', function() {
			res.json(body);
		})
			
	}) 
	
})

app.listen(port, function() {
	console.log('the server is running on port ' + port);
})  