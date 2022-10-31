'use strict'

require('dotenv').config()
const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


app.use('/api/table/', require('./controllers/table'));
app.use('/api/customer', require('./controllers/customer'));
app.use('/api/reservation', require('./controllers/reservation'));



// Start server
app.listen(process.env.LISTENPORT || 3002, () => {
  console.log(`Server listening on port ${process.env.LISTENPORT}`)
})