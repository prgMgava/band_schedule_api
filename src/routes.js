const express = require("express");

const UserController = require('./controllers/UserController')

const routes = express.Router();

routes.get("/", (req, res) => res.json({ response: "Thats is right" }));
routes.post("/user/adm", UserController.createAdmin);
routes.post("/login", UserController.login);


module.exports = routes;
