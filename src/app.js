'use strict';
//import native packages
const fs = require("fs");
const path = require("path");


//import non-native packages
const express = require('express');
const jsonParser = require('body-parser').json;
const logger = require('morgan');
const favicon = require('serve-favicon');
const spdy = require("spdy");



//import files
const routes = require('./routes/routes');
const serveCompressed = require('./scripts/compression.js');
const pushAssets = require("./scripts/serverPush.js");
const ensureSecure = require("./routes/ensureSecure.js");

//declare variables
const port = process.env.PORT || 4000;
const app = express();
const http = express();


app.use(logger("dev"));
app.use(jsonParser());

//Redirect traffic to secure connection
http.all("*", ensureSecure(port));
app.use(favicon("./public/css/images/cloud.ico"));
//run js and css file requests through compression middleware
app.get('*bundle.js', serveCompressed('text/javascript'))
app.get('*.css', serveCompressed('text/css')) 


app.use('/api', routes);
app.get("/", pushAssets);

app.use(express.static("public"));


//catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found!');
	err.status = 404;
	next(err);
}) 

//Error Handler 
app.use((err, req, res, next) => {
	res
		.status(err.status || 500)
		.send({err: {message: err.message}});
}); 


http.listen(3000)
spdy
	.createServer({
		key: fs.readFileSync('encryption/server.key'),
		cert: fs.readFileSync('encryption/server.crt')
	}, app)
	.listen(port, err => {
		if(err) {
			console.error(error);
			return process.exit(1);
		} else {
			console.log('the server is running on port ' + port);
		}
	}); 




