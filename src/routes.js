const express = require("express");
const { authJwt } = require("./middleware/index")

const UserController = require('./controllers/UserController');
const BandController = require("./controllers/BandController");
const AppointmentController = require("./controllers/AppointmentController");
const LabelController = require("./controllers/LabelController");

const routes = express.Router();

routes.get("/user", [authJwt.verifyToken, authJwt.isSuperAdmin], UserController.listAllUsers);
routes.get("/user/adm", [authJwt.verifyToken, authJwt.isSuperAdmin], UserController.listAdm);
routes.get("/user/member", [authJwt.verifyToken, authJwt.isSuperAdmin], UserController.listMember);
routes.get("/user/:id", [authJwt.verifyToken, authJwt.isSuperAdmin], UserController.listUserById)
routes.post("/user/adm", [authJwt.verifyToken, authJwt.isSuperAdmin], UserController.createAdmin);
routes.post("/user/member", UserController.createMember);
routes.patch("/user/:id", [authJwt.verifyToken], UserController.updateUser)
routes.delete("/user/:id", [authJwt.verifyToken, authJwt.isSuperAdmin], UserController.deleteUser)

routes.post("/login", UserController.login);

routes.post("/band", [authJwt.verifyToken, authJwt.isAdmin], BandController.createBand)
routes.get("/band", [authJwt.verifyToken, authJwt.isSuperAdmin], BandController.listAllBands)
routes.get("/band/:id", [authJwt.verifyToken, authJwt.isAdmin], BandController.listBandById)
routes.get("/band/owner/:id", [authJwt.verifyToken, authJwt.isAdmin], BandController.listBandByUserId)
routes.patch("/band/:id", [authJwt.verifyToken, authJwt.isAdmin], BandController.updateBand)
routes.delete("/band/:id", [authJwt.verifyToken, authJwt.isSuperAdmin], BandController.deleteBand)


routes.post("/appointment", [authJwt.verifyToken, authJwt.isAdmin], AppointmentController.createAppointment)
routes.get("/appointment", [authJwt.verifyToken], AppointmentController.listAllAppointments)
routes.get("/appointment/:id", [authJwt.verifyToken], AppointmentController.listAppointmentById)
routes.get("/appointment/band/:id", [authJwt.verifyToken], AppointmentController.listAppointmentByBandId)
routes.patch("/appointment/:id", [authJwt.verifyToken, authJwt.isAdmin], AppointmentController.updateAppointment)
routes.delete("/appointment/:id", [authJwt.verifyToken, authJwt.isAdmin], AppointmentController.deleteAppointment)

routes.post("/label", [authJwt.verifyToken, authJwt.isAdmin], LabelController.createLabel)
routes.get("/label", [authJwt.verifyToken], LabelController.listAllLabels)
routes.get("/label/:id", [authJwt.verifyToken], LabelController.listLabelById)
routes.patch("/label/:id", [authJwt.verifyToken, authJwt.isSuperAdmin], LabelController.updateLabel)
routes.delete("/label/:id", [authJwt.verifyToken, authJwt.isSuperAdmin], LabelController.deleteLabel)


module.exports = routes;
