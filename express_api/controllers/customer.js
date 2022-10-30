'use strict'
//CUSTOMER CONTROLLER

'use strict'
//TABLE CONTROLLER

const StringHelpers = require('../libraries/string-helpers')
const { pool } = require('../config')
var createError = require('http-errors')
var express = require('express');
var customers = express.Router();

customers.post('/', (req, res) => {
  console.log(req.body);
  // var rdate = req.params.rdate;
  // var rtime = req.params.rtime;
  // var numOfSeats = req.params.numseats;

  // if(StringHelpers.isNullOrWhitespace(rdate) 
  //     || StringHelpers.isNullOrWhitespace(rtime) 
  //     || StringHelpers.isNullOrWhitespace(numOfSeats))
  //   return res.status(404).send({ error: `Bad Request, missing parameter.`});
  // var rdateParsed = Date.parse(rdate);
  // if(!rdateParsed)
  //   return res.status(404).send({ error: `Bad Request, Cannot parse date. ${rdate}`});
  // var rtimeParsed = Date.parse(`1970-01-01 ${rtime.replace('PM', 'GMT').replace('AM', 'GMT')}`);
  // if(!rtimeParsed)
  //   return res.status(404).send({ error: `Bad Request, Cannot parse time. ${rtime}`});
  // if(!(numOfSeats >= 2))
  //   return res.status(404).send({ error: `Bad Request, Number of seats must be equal to or greater than 2. Requested: ${numOfSeats}`});

  // const query = {
  //   name: 'getAvailableTables',
  //   text: "select ti.id, ti.table_column, ti.table_row " +
  //     " from public.table_info ti " +
  //     " where ti.seat_count = $1 " +
  //     "   and ti.id not in ( " +
  //     " " +
  //     " select r.table_id " +
  //     " from public.reservations r " +
  //     " where " +
  //     "   r.r_date = $2 " +
  //     "   and r.r_time = $3 " +
  //     "   and r.cancelled = false " +
  //     " );",
  //   values: [ numOfSeats, rdate, rtime]
  // }

  // pool.query(query, (error, results) => {
  //   if (error) 
  //     throw error;
    
    res.send(results.rows);
  //});
});

module.exports = customers;