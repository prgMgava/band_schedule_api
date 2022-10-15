const express = require("express");
const { authJwt } = require("./middleware/index")

const UserController = require('./controllers/UserController')

const routes = express.Router();

routes.get("/", (req, res) => res.json({ response: "Thats is right" }));
routes.post("/user/adm", [authJwt.verifyToken, authJwt.isSuperAdmin], UserController.createAdmin);
routes.post("/user/member", UserController.createMember);
routes.get("/user", [authJwt.verifyToken, authJwt.isSuperAdmin], UserController.listAllUsers);
routes.get("/user/:id", [authJwt.verifyToken, authJwt.isSuperAdmin], UserController.listUserById)
routes.patch("/user/:id", [authJwt.verifyToken], UserController.updateUser)
routes.delete("/user/:id", [authJwt.verifyToken, authJwt.isSuperAdmin], UserController.deleteUser)

routes.post("/login", UserController.login);


module.exports = routes;
