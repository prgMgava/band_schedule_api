require("dotenv/config");

const express = require("express");

const app = express();

app.listen(process.env.API_PORT || 3333, () => console.log("Listen on 3333"));
