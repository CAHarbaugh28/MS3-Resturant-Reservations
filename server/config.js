console.log(`Starting up...`)
require('dotenv').config()

//Native PG Configure
const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'
const connectionString = `postgresql://${process.env.DB_USER || 'app_user'}:${process.env.DB_PASSWORD || 'some_password'}@${process.env.DB_HOST || '127.0.0.1' }:${process.env.DB_PORT || '5432' }/${process.env.DB_DATABASE || 'resturantreservations'}`
console.log(`Environment: ${process.env.NODE_ENV}`)
console.log(`Database Url: ${process.env.DATABASE_URL}`)

//https://stackoverflow.com/questions/62098110/heroku-app-throwing-error-self-signed-certificate
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: { rejectUnauthorized: false },
})

module.exports = { pool }