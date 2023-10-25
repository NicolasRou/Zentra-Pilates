require("dotenv").config();
const { Pool } = require("pg");

const config = {
  user: process.env.USER_DB,
  host: process.env.HOST_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE,
  port: process.env.PG_PORT,
};

const pool = new Pool(config);

module.exports = {
  query: (text, params) => pool.query(text, params),
};
