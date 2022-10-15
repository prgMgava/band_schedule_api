require("dotenv/config");

const express = require("express");
const routes = require("./routes");

require("./database");

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
	res.header(
		"Access-Control-Allow-Headers",
		"x-access-token, Origin, Content-Type, Accept"
	);
	next();
});
app.use(routes);

app.listen(process.env.API_PORT || 3333);
