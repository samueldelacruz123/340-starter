const { Pool } = require("pg");
require("dotenv").config();

const isDev = process.env.NODE_ENV === "development";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isDev
      ? { rejectUnauthorized: false }  // dev mode SSL config
      : { rejectUnauthorized: false }, // production SSL config (required)
});

// For development: export a custom query function with logs
if (isDev) {
  module.exports = {
    async query(text, params) {
      try {
        const res = await pool.query(text, params);
        console.log("executed query", { text });
        return res;
      } catch (error) {
        console.error("error in query", { text });
        throw error;
      }
    },
  };
} else {
  // In production, just export the pool directly
  module.exports = pool;
}