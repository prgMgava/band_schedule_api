require("dotenv/config");
var cors = require("cors");

const express = require("express");
const routes = require("./routes");
const compression = require("compression");

const https = require('https')
const path = require('path')
const fs = require('fs')

require("./database");

const app = express();
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

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)

sslServer.listen(3333)

//app.listen(process.env.API_PORT || 3333);

