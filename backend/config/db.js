const mysql = require("mysql2/promise");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require("./env");
const logger = require("../utils/logger");

const dbConfig = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
};

const pool = mysql.createPool(dbConfig);
console.log("Database configuration:", dbConfig);

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    logger.info("Database connected successfully.");
  } catch (error) {
    logger.error("Database connection failed:", error);
  }
};

testConnection();

module.exports = pool;
