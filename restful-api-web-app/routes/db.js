const Pool = require("pg").Pool;
const pool = new Pool({
  user: "Josh",
  host: "localhost",
  database: "Josh's Book Store",
  password: "Gosthatsit2",
  port: 3000,
});
module.exports = pool;
