require("dotenv/config");
const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");

const connection = new Sequelize(dbConfig[process.env.NODE_ENV]);

User.init(connection);

module.exports = connection;
