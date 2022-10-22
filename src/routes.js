const express = require("express");
const { authJwt } = require("./middleware/index")

const UserController = require('./controllers/UserController');
const BandController = require("./controllers/BandController");
const EventController = require("./controllers/EventController");

const routes = express.Router();

routes.get("/user", [authJwt.verifyToken, authJwt.isSuperAdmin], UserController.listAllUsers);
routes.get("/user/adm", [authJwt.verifyToken, authJwt.isSuperAdmin], UserController.listAdm);
routes.get("/user/:id", [authJwt.verifyToken, authJwt.isSuperAdmin], UserController.listUserById)
routes.post("/user/adm", [authJwt.verifyToken, authJwt.isSuperAdmin], UserController.createAdmin);
routes.post("/user/member", UserController.createMember);
routes.patch("/user/:id", [authJwt.verifyToken], UserController.updateUser)
routes.delete("/user/:id", [authJwt.verifyToken, authJwt.isSuperAdmin], UserController.deleteUser)

routes.post("/login", UserController.login);

routes.post("/band", [authJwt.verifyToken, authJwt.isAdmin], BandController.createBand)
routes.get("/band", [authJwt.verifyToken, authJwt.isSuperAdmin], BandController.listAllBands)
routes.get("/band/:id", [authJwt.verifyToken, authJwt.isAdmin], BandController.listBandById)
routes.get("/band/owner/:id", [authJwt.verifyToken, authJwt.isSuperAdmin], BandController.listBandByUserId)
routes.patch("/band/:id", [authJwt.verifyToken, authJwt.isAdmin], BandController.updateBand)
routes.delete("/band/:id", [authJwt.verifyToken, authJwt.isSuperAdmin], BandController.deleteBand)


routes.post("/event", [authJwt.verifyToken, authJwt.isAdmin], EventController.createEvent)
routes.get("/event", [authJwt.verifyToken], EventController.listAllEvents)
routes.get("/event/:id", [authJwt.verifyToken], EventController.listEventById)
routes.get("/event/band/:id", [authJwt.verifyToken], EventController.listEventByBandId)
routes.patch("/event/:id", [authJwt.verifyToken, authJwt.isAdmin], EventController.updateEvent)
routes.delete("/event/:id", [authJwt.verifyToken, authJwt.isAdmin], EventController.deleteEvent)



module.exports = routes;
