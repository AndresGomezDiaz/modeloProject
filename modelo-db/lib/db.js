'use strict'
const { Client, Pool } = require('pg')
const config = require('../config')
// const client = new Client({
//   user: config.db.username,
//   host: config.db.host,
//   database: config.db.database,
//   password: config.db.password,
//   port: 5432,
// })
const client = new Pool({
  user: config.db.username,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: 5432,
})
module.exports = client