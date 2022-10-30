'use strict'
//CUSTOMER CONTROLLER

const StringHelpers = require('../libraries/string-helpers')
const { pool } = require('../config')
var createError = require('http-errors')
var express = require('express');
var reservations = express.Router();

reservations.post('/', async (req, res) => {
  if(StringHelpers.isNull(req.body)) 
    return res.status(400).send({ error: `Bad Request, body is null or empty.`});
  if(StringHelpers.isNull(req.body.customerId)) 
    return res.status(400).send({ error: `Bad Request, customerId is null or empty.`});
  if(StringHelpers.isNull(req.body.tableId)) 
    return res.status(400).send({ error: `Bad Request, tableId is null or empty.`});    
  if(StringHelpers.isNullOrWhitespace(req.body.rdate)) 
    return res.status(400).send({ error: `Bad Request, rdate is null or empty.`});
  if(StringHelpers.isNullOrWhitespace(req.body.rtime)) 
    return res.status(400).send({ error: `Bad Request, rtime is null or empty.`});    
 
  var rdate = req.body.rdate;
  var rdateParsed = Date.parse(rdate);
  if(!rdateParsed)
    return res.status(400).send({ error: `Bad Request, Cannot parse date. ${rdate}`});
  var rtime = req.body.rtime;
  var rtimeParsed = Date.parse(`1970-01-01 ${rtime.replace('PM', 'GMT').replace('AM', 'GMT')}`);
  if(!rtimeParsed)
    return res.status(400).send({ error: `Bad Request, Cannot parse time. ${rtime}`});

    var confirmationCode;
    const query = {
      name: 'postReservation',
      text: `CALL public.new_reservation($1, $2, $3, $4, $5);`,
      values: [ req.body.customerId, req.body.tableId, req.body.rdate, req.body.rtime, confirmationCode ]
    }

    await pool.query(query)
      .then(v =>
        {
          confirmationCode = v.rows[0];
          res.send(confirmationCode);
        }
      )
      .catch((error) => {
        console.error(error)
        res.status(400).send({ error: `Message: ${error.message}`});
      });
});

reservations.get('/:id', async (req, res) => {
  var reservationId = req.params.id;
  if(StringHelpers.isNullOrWhitespace(reservationId)) 
    return res.status(400).send({ error: `Bad Request, reservationId is null or empty.`});

    const query = {
      name: 'getReservation',
      text: "select id, customer_id as customerId, table_id as tableId, r_date as rdate," +
      " r_time as rtime, arrived, cancelled, confirmationid as confirmationCode, created_date as created from public.reservations where id=$1;",
      values: [ reservationId ]
    }

    var reservationResults;
    await pool.query(query)
      .then(v =>
        {
          reservationResults = v.rows[0];
          res.send(reservationResults);
        }
      )
      .catch((error) => {
        console.error(error)
        res.status(400).send({ error: `Message: ${error.message}`});
      });
});

reservations.get('/cancel/:id', async (req, res) => {
  var reservationId = req.params.id;
  if(StringHelpers.isNullOrWhitespace(reservationId)) 
    return res.status(400).send({ error: `Bad Request, reservationId is null or empty.`});

    const query = {
      name: 'getReservation',
      text: "select id, customer_id as customerId, table_id as tableId, r_date as rdate," +
      " r_time as rtime, arrived, cancelled, confirmationid as confirmationCode, created_date as created from public.reservations where id=$1;",
      values: [ reservationId ]
    }

    var reservationResults;
    await pool.query(query)
      .then(v =>
        {
          reservationResults = v.rows[0];
          res.send(reservationResults);
        }
      )
      .catch((error) => {
        console.error(error)
        res.status(400).send({ error: `Message: ${error.message}`});
      });
});
module.exports = reservations;