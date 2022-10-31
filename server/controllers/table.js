'use strict'
//TABLE CONTROLLER

const StringHelpers = require('../libraries/string-helpers')
const { pool } = require('../config')
var createError = require('http-errors')
var express = require('express');
var tables = express.Router();

tables.get('/getAvailableTables/:rdate/:rtime/:numseats', function(req, res) {
  var rdate = req.params.rdate;
  var rtime = req.params.rtime;
  var numOfSeats = req.params.numseats;

  if(StringHelpers.isNullOrWhitespace(rdate) 
      || StringHelpers.isNullOrWhitespace(rtime) 
      || StringHelpers.isNullOrWhitespace(numOfSeats))
    return res.status(400).send({ error: `Bad Request, missing parameter.`});
  var rdateParsed = Date.parse(rdate);
  if(!rdateParsed)
    return res.status(400).send({ error: `Bad Request, Cannot parse date. ${rdate}`});
  var rtimeParsed = Date.parse(`1970-01-01 ${rtime.replace('PM', 'GMT').replace('AM', 'GMT')}`);
  if(!rtimeParsed)
    return res.status(400).send({ error: `Bad Request, Cannot parse time. ${rtime}`});
  if(!(numOfSeats >= 2))
    return res.status(400).send({ error: `Bad Request, Number of seats must be equal to or greater than 2. Requested: ${numOfSeats}`});

  const query = {
    name: 'getAvailableTables',
    text: "select ti.id, ti.table_column, ti.table_row " +
      " from public.table_info ti " +
      " where ti.seat_count = $1 " +
      "   and ti.id not in ( " +
      " " +
      " select r.table_id " +
      " from public.reservations r " +
      " where " +
      "   r.r_date = $2 " +
      "   and r.r_time = $3 " +
      "   and r.cancelled = false " +
      " );",
    values: [ numOfSeats, rdate, rtime]
  }

  pool.query(query, (error, results) => {
    if (error) 
      throw error;
    
    res.send(results.rows);
  });
});

tables.get('/getAvailableTimes/:trow/:tcol/:rdate', function(req, res) {
  var col = req.params.tcol;
  var row = req.params.trow;
  var rdate = req.params.rdate;

  if(StringHelpers.isNullOrWhitespace(col) 
  || StringHelpers.isNullOrWhitespace(row) 
  || StringHelpers.isNullOrWhitespace(rdate))
    return res.status(400).send({ error: `Bad Request, missing parameter.`});

  var rdateParsed = Date.parse(rdate);
  if(!rdateParsed)
    return res.status(400).send({ error: `Bad Request, Cannot parse date. ${rdate}`});

  const tableIdQuery = {
    name: 'tableIdQuery',
    text: "select ti.id from table_info ti where ti.table_column=$1 and ti.table_row=$2;",
    values: [ col, row ]
  }

  pool.query(tableIdQuery, (error, results) => {
    if (error) {
      throw error
    }

    if(results.rowCount == 0)
      return res.status(400).send({ error: `Bad Request, Table does note exist. Column '${col}': Row '${row}'`});

    var tableId = results.rows[0].id
    console.log(`Table Location - Column "${col}": Row "${row}" TableId: ${tableId}`);
    console.log(`Table Reservation Date: ${rdate}`);

    //res.send('List of tables.');
    const getAvalibleTimesQuery = {
      name: 'getAvalibleTimesQuery',
      
      text: "select hl.hours " +
      " from public.hours_list hl " +
      " where hours not in ( " +
      "   select r.r_time " +
      "   from public.reservations r " +
      "   inner join public.table_info ti " +
      "     on r.table_id=ti.id " +
      "   where "  +
      "     ti.id = $1 " +
      "     and r.r_date = $2 " +
      "     and r.cancelled = false " +
      " );",
      
      values: [ tableId, rdate ]
    }

    pool.query(getAvalibleTimesQuery, (error, results) => {
      if (error) {
        throw error
      }
      
      if (results.rowCount == 0)
        res.send([ { hours: "Not Avalible" } ] );
      else
        res.send(results.rows);
    });
  });

});

module.exports = tables;