require("dotenv/config");
import * as sequelize from "sequelize";
import dbConfig from "../config/database";

import { User } from "../entities/User";
import Band from "../entities/Band";
import Appointment from "../entities/Appointment";
import Label from "../entities/Label";

const env = process.env.NODE_ENV || "";
const connection = new sequelize.Sequelize(dbConfig[env]);

User.init(connection);
Band.init(connection);
Label.init(connection);
Appointment.init(connection);

User.associate(connection.models);
Band.associate(connection.models);
Label.associate(connection.models);
Appointment.associate(connection.models);

module.exports = connection;
