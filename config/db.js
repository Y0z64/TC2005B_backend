const { Pool } = require("pg");

const db = new Pool({
  user: "catedratec",
  password: "password",
  database: "catedraapi",
  host: "localhost",
  port: "5432",
});

module.exports = {
  query: (text, params) => db.query(text, params),
};