require("dotenv/config");

module.exports = {
    dialect: "postgres",
    host: process.env.HOST,
    username: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    define: {
        timestamps: true,
        underscored: true,
    },
};
