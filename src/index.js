require("dotenv/config");
var cors = require("cors");
var fs = require("fs");
var http = require("http");
var https = require("https");
var privateKey = fs.readFileSync(
  "/etc/ssl/private/nginx-selfsigned.key",
  "utf8"
);
var certificate = fs.readFileSync(
  "/etc/ssl/certs/nginx-selfsigned.crt",
  "utf8"
);
var credentials = { key: privateKey, cert: certificate };

const express = require("express");
const routes = require("./routes");
const compression = require("compression");

require("./database");

const app = express();
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

app.use(cors());
app.use(compression());
app.use(express.json());
// app.use(function (req, res, next) {
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"x-access-token, Origin, Content-Type, Accept"
// 	);
// 	next();
// });
app.use(routes);
//TODO: handling error
// app.use((error, request, response, next) => {
// 	response.status(error.status || 500).json({
// 		status: 'error',
// 		error: {
// 			message: error.message || 'some error',
// 		},
// 	});
// })
httpServer.listen(3332);
httpsServer.listen(3333);
//app.listen(process.env.API_PORT || 3333);
