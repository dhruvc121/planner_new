const Pool = require("pg").Pool;

/* const connectionString=process.env.NODE_ENV==="development"?"postgres://postgres:rootuser@localhost:5432/task-assign":process.env.DATABASE_URL; */
const connectionString=process.env.NODE_ENV==="development"?"postgres://postgres:rootuser@localhost:5432/planner":process.env.DATABASE_URL;
const ssl=process.env.NODE_ENV==="development"?{}:{rejectUnauthorized: false}
const pool = new Pool({
  connectionString,
  //ssl
});

module.exports = pool;