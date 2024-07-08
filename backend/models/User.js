const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const Task = require("./Task");

const User = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
