'use strict'
//CUSTOMER CONTROLLER

const StringHelpers = require('../libraries/string-helpers')
const { pool } = require('../config')
var createError = require('http-errors')
var express = require('express');
var customers = express.Router();

customers.post('/', async (req, res) => {
  if(StringHelpers.isNull(req.body)) 
    return res.status(400).send({ error: `Bad Request, body is null or empty.`});
  if(StringHelpers.isNullOrWhitespace(req.body.firstName)) 
    return res.status(400).send({ error: `Bad Request, firstName is null or empty.`});
  if(StringHelpers.isNullOrWhitespace(req.body.lastName)) 
    return res.status(400).send({ error: `Bad Request, lastName is null or empty.`});    
  if(StringHelpers.isNullOrWhitespace(req.body.phone)) 
    return res.status(400).send({ error: `Bad Request, phone is null or empty.`});
  if(StringHelpers.isNullOrWhitespace(req.body.email)) 
    return res.status(400).send({ error: `Bad Request, email is null or empty.`});           

    var myoutput;
    const query = {
      name: 'postCustomer',
      text: `CALL public.upsert_customer($1, $2, $3, $4, $5);`,
      values: [ req.body.firstName, req.body.lastName, req.body.phone, req.body.email, myoutput ]
    }

    var customerId;
    await pool.query(query)
      .then(v =>
        {
          customerId = v.rows[0];
          res.send(customerId);
        }
      )
      .catch((error) => {
        console.error(error)
        res.status(400).send({ error: `Message: ${error.message}`});
      });
});

customers.get('/:id', async (req, res) => {
  var customerId = req.params.id;
  if(StringHelpers.isNullOrWhitespace(customerId)) 
    return res.status(400).send({ error: `Bad Request, customerId is null or empty.`});

    const query = {
      name: 'getCustomer',
      text: `select id, first_name as firstName, last_name as lastName, phone_number as phone, email, created_date as created from public.customer_info where id=$1;`,
      values: [ customerId ]
    }

    var customerResult;
    await pool.query(query)
      .then(v =>
        {
          customerResult = v.rows[0];
          res.send(customerResult);
        }
      )
      .catch((error) => {
        console.error(error)
        res.status(400).send({ error: `Message: ${error.message}`});
      });
});

module.exports = customers;