require("dotenv/config");
const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../application/models/User").default;
const Band = require("../application/models/Band").default;
const Appointment = require("../application/models/Appointment").default;
const Label = require("../application/models/Label").default;

const connection = new Sequelize(dbConfig[process.env.NODE_ENV]);

User.init(connection);
Band.init(connection);
Label.init(connection);
Appointment.init(connection);

User.associate(connection.models);
Band.associate(connection.models);
Label.associate(connection.models);
Appointment.associate(connection.models);

module.exports = connection;
