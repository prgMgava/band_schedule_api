const express = require("express");
const { authJwt } = require("./middleware/index");

const UserController = require("./controllers/UserController");
const BandController = require("./controllers/BandController");
const AppointmentController = require("./controllers/AppointmentController");
const LabelController = require("./controllers/LabelController");

const routes = express.Router();

routes.get("/user", [authJwt.verifyToken, authJwt.verifyPermission], UserController.listAllUsers);
routes.get("/user/adm", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin], UserController.listAdm);
routes.get("/user/member", [authJwt.verifyToken, authJwt.verifyPermission], UserController.listMember);
routes.get("/user/:id", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isSuperAdmin], UserController.listUserById);
routes.post("/user/adm", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isSuperAdmin], UserController.createAdmin);
routes.post("/user/member", UserController.createMember);
routes.patch("/user/:id", [authJwt.verifyToken, authJwt.verifyPermission], UserController.updateUser);
routes.delete("/user/:id", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isSuperAdmin], UserController.deleteUser);

routes.post("/login", UserController.login);

routes.post("/band", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin], BandController.createBand);
routes.get("/band", [authJwt.verifyToken, authJwt.verifyPermission], BandController.listAllBands);
routes.get("/band/:id", [authJwt.verifyToken, authJwt.verifyPermission], BandController.listBandById);
routes.get("/band/owner/:id", [authJwt.verifyToken, authJwt.verifyPermission], BandController.listBandByUserId);
routes.patch("/band/:id", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin], BandController.updateBand);
routes.delete("/band/:id", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isSuperAdmin], BandController.deleteBand);

routes.post("/appointment", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin], AppointmentController.createAppointment);
routes.get("/appointment", [authJwt.verifyToken, authJwt.verifyPermission], AppointmentController.listAllAppointments);
routes.get("/appointment/:id", [authJwt.verifyToken, authJwt.verifyPermission], AppointmentController.listAppointmentById);
routes.get("/appointment/owner/:id", [authJwt.verifyToken, authJwt.verifyPermission], AppointmentController.listMyAppointments);

routes.get("/appointment/band/:id", [authJwt.verifyToken, authJwt.verifyPermission], AppointmentController.listAppointmentByBandId);
routes.patch("/appointment/:id", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin], AppointmentController.updateAppointment);
routes.patch("/appointment", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin], AppointmentController.updateAppointmentStatus);
routes.delete("/appointment/:id", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin], AppointmentController.deleteAppointment);

routes.post("/label", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin], LabelController.createLabel);
routes.get("/label", [authJwt.verifyToken, authJwt.verifyPermission], LabelController.listAllLabels);
routes.get("/label/:id", [authJwt.verifyToken, authJwt.verifyPermission], LabelController.listLabelById);
routes.patch("/label/:id", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isSuperAdmin], LabelController.updateLabel);
routes.delete("/label/:id", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isSuperAdmin], LabelController.deleteLabel);

routes.get("/", (req, res) => res.json({ message: "Nice" }));

module.exports = routes;
