require("dotenv/config");
const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Band = require("../models/Band");
const Appointment = require("../models/Appointment");
const Label = require("../models/Label");
const Checkout = require("../models/Checkout");

const connection = new Sequelize(dbConfig[process.env.NODE_ENV]);

User.init(connection);
Band.init(connection);
Label.init(connection)
Appointment.init(connection);
Checkout.init(connection);


User.associate(connection.models);
Band.associate(connection.models)
Label.associate(connection.models)
Appointment.associate(connection.models)
Checkout.associate(connection.models)

module.exports = connection;
