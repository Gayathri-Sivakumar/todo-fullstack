const { Sequelize } = require("sequelize");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require("../config/env");
const logger = require("../utils/logger");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: (msg) => logger.info(msg),
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connected successfully.");
  } catch (error) {
    logger.error("Database connection failed:", error);
  }
};

testConnection();

module.exports = sequelize;
