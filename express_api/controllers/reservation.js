'use strict'
//RESERVATION CONTROLLER

const { pool } = require('../config')
var express = require('express');
var api_reservations = express.Router();

api_reservations.get('/', function(req, res) {
  res.send('List of reservations.');
});

module.exports = api_reservations;