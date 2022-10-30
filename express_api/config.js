require('dotenv').config()

//Native PG Configure
const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})

//Sequalize Configure
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,

  pool: {
    max: ~~process.env.POOL_MAX,
    min: ~~process.env.POOL_MIN,
    acquire: ~~process.env.POOL_AQUIRE,
    idle: ~~process.env.POOL_IDLE
  }
});

const seqDb = {};

seqDb.Sequelize = Sequelize;
seqDb.sequelize = sequelize;

///seqDb.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = { pool, seqDb }