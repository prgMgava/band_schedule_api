require("dotenv/config");

module.exports = {
  development: {
    username: "root",
    password: "1234",
    database: "band_schedule_db",
    host: "127.0.0.1",
    dialect: "mysql",
    port: "3306",
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  production: {
    dialect: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    define: {
      timestamps: true,
      underscored: true,
    },
  },
};
