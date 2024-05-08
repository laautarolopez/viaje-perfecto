require('dotenv').config();
const { Pool } = require('pg');
const { newDb } = require('pg-mem');
const PoolTest = newDb().adapters.createPg().Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const poolTest = new PoolTest()

module.exports = {
  query: (text, params) => process.env.NODE_ENV == 'test' ? poolTest.query(text, params) : pool.query(text, params),
  end: () => process.env.NODE_ENV == 'test' ? poolTest.end() : pool.end()
}