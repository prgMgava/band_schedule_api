const express = require("express");

// import controllers

const routes = express.Router();

routes.get("/", (req, res) => res.json({ response: "Thats is right" }));

module.exports = routes;
