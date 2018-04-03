'use strict';

const express = require('express');
const router = express.Router();
const { getCurrentWeather, getWeatherFromSearch } = require("./helper");


//ROUTES

router.post("/current", getCurrentWeather);

router.post("/search", getWeatherFromSearch);


module.exports = router;









