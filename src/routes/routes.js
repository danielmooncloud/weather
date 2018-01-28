'use strict';

const express = require('express');
const router = express.Router();
const {getWeatherFromIP, getWeatherFromSearch} = require("./helper");


//ROUTES

router.get("/ip", getWeatherFromIP);

router.post("/search", getWeatherFromSearch);


module.exports = router;









