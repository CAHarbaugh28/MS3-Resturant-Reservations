'use strict'
//Reservation CONTROLLER

const StringHelpers = require('../libraries/string-helpers')
const { pool } = require('../config')
var createError = require('http-errors')
var express = require('express');
var reservations = express.Router();

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

reservations.get('/getAllByDate/:rdate', async (req, res) => {
  var rdate = req.params.rdate;
  var rdateParsed = Date.parse(rdate);
  if(!rdateParsed)
    return res.status(400).send({ error: `Bad Request, Cannot parse date. ${rdate}`});

    const query = {
      name: 'getReservation',
      text: "select id, customer_id as customerId, table_id as tableId, r_date as rdate," +
      " r_time as rtime, arrived, cancelled, confirmationid as confirmationCode, created_date as created from public.reservations where r_date=$1;",
      values: [ rdate ]
    }

    var reservationResults;
    await pool.query(query)
      .then(v =>
        {
          reservationResults = v.rows;
          res.send(reservationResults);
        }
      )
      .catch((error) => {
        console.error(error)
        res.status(400).send({ error: `Message: ${error.message}`});
      });
});

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

reservations.post('/cancel/:confirmationCode', async (req, res) => {
  var confirmationCode = req.params.confirmationCode;
  var resExists = true;
  if(StringHelpers.isNullOrWhitespace(confirmationCode)) 
    return res.status(400).send({ error: `Bad Request, confirmationCode is null or empty.`});

    //makesure the code the entered exists before we try to cancel. bubble up 404 if not found.
    const confirmationCheckQuery = {
      name: 'getConfirmationCodeExists',
      text: "select exists(select * from public.reservations where confirmationId=$1);",
      values: [ confirmationCode ]
    }
    await pool.query(confirmationCheckQuery)
    .then(v =>
      {
        resExists = v.rows[0].exists;
        if (!resExists)
        return res.status(404).send({ error: `Not Found, confirmationCode not found. Requested: ${confirmationCode}`});
      }
    )
    .catch((error) => {
      console.error(error)
      res.status(500).send({ error: `Message: ${error.message}`});
    });

    if(resExists) {
      const query = {
        name: 'updateReservation',
        text: "update public.reservations set cancelled=true where confirmationId=$1;",
        values: [ confirmationCode ]
      }

      var reservationResults;
      await pool.query(query)
        .then(v =>
          {
            reservationResults = v;
            res.status(204).send(); //No Content or no result was expected.
          }
        )
        .catch((error) => {
          console.error(error)
          res.status(400).send({ error: `Message: ${error.message}`});
        });
    }
});

reservations.post('/arrived/:confirmationCode', async (req, res) => {
  var confirmationCode = req.params.confirmationCode;
  var resExists = true;
  if(StringHelpers.isNullOrWhitespace(confirmationCode)) 
    return res.status(400).send({ error: `Bad Request, confirmationCode is null or empty.`});

    //makesure the code the entered exists before we try to cancel. bubble up 404 if not found.
    const confirmationCheckQuery = {
      name: 'getConfirmationCodeExists',
      text: "select exists(select * from public.reservations where confirmationId=$1);",
      values: [ confirmationCode ]
    }
    await pool.query(confirmationCheckQuery)
    .then(v =>
      {
        resExists = v.rows[0].exists;
        if (!resExists)
        return res.status(404).send({ error: `Not Found, confirmationCode not found. Requested: ${confirmationCode}`});
      }
    )
    .catch((error) => {
      console.error(error)
      res.status(500).send({ error: `Message: ${error.message}`});
    });

    if(resExists) {
      const query = {
        name: 'updateReservation',
        text: "update public.reservations set arrived=true where confirmationId=$1;",
        values: [ confirmationCode ]
      }

      var reservationResults;
      await pool.query(query)
        .then(v =>
          {
            reservationResults = v;
            res.status(204).send(); //No Content or no result was expected.
          }
        )
        .catch((error) => {
          console.error(error)
          res.status(400).send({ error: `Message: ${error.message}`});
        });
    }
});

module.exports = reservations;