'use strict';


var express = require('express');
var https = require('https');
var port = process.env.PORT || 4000;
var jsonParser = require('body-parser').json;
var logger = require('morgan');
var routes = require('./routes/routes');
var favicon = require('serve-favicon');
var urlString = 'https://api.darksky.net/forecast/efc9eb6642cbfb5aa7be713b8a9ab9de/';


var app = express();

app.use(logger("dev"));
app.use(jsonParser());

app.use('/', express.static('public'));
app.use(favicon('./public/images/cloud.png'));




app.use('/api', routes);


//catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found!');
	err.status = 404;
	next(err);
}) 

//Error Handler 
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		err: {
			message: err.message
		}
	})
}) 

app.listen(port, function() {
	console.log('the server is running on port ' + port);
})  



