const express = require("express");
const { authJwt } = require("./middleware/index");

const UserController = require("./controllers/UserController");
const BandController = require("./controllers/BandController");
const AppointmentController = require("./controllers/AppointmentController");
const LabelController = require("./controllers/LabelController");
const CheckoutController = require("./controllers/CheckoutController");
const CreditorController = require("./controllers/CreditorController");



const routes = express.Router();

routes.get(
  "/user",
  [authJwt.verifyToken, authJwt.verifyPermission],
  UserController.listAllUsers
);
routes.get(
  "/user/adm",
  [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin],
  UserController.listAdm
);
routes.get(
  "/user/member",
  [authJwt.verifyToken, authJwt.verifyPermission],
  UserController.listMember
);
routes.get(
  "/user/:id",
  [authJwt.verifyToken, authJwt.verifyPermission],
  UserController.listUserById
);
routes.post(
  "/user/adm",
  [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isSuperAdmin],
  UserController.createAdmin
);
routes.post("/user/member", UserController.createMember);
routes.patch(
  "/user/:id",
  [authJwt.verifyToken, authJwt.verifyPermission],
  UserController.updateUser
);
routes.delete(
  "/user/:id",
  [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isSuperAdmin],
  UserController.deleteUser
);

routes.post("/login", UserController.login);

routes.post("/band", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin], BandController.createBand);
routes.get("/band", [authJwt.verifyToken, authJwt.verifyPermission], BandController.listAllBands);
routes.get("/band/:id", [authJwt.verifyToken, authJwt.verifyPermission], BandController.listBandById);
routes.get("/band/owner/:id", [authJwt.verifyToken, authJwt.verifyPermission], BandController.listBandByUserId);
routes.patch("/band/:id", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin], BandController.updateBand);
routes.delete("/band/:id", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isSuperAdmin], BandController.deleteBand);

routes.post("/appointment", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin], AppointmentController.createAppointment);
routes.get("/appointment", [authJwt.verifyToken, authJwt.verifyPermission], AppointmentController.listAllAppointments);
routes.get("/appointment/:id/report", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin], AppointmentController.listMyAppointmentsByTitle);
routes.get("/appointment/:id/advanced", [authJwt.verifyToken, authJwt.verifyPermission], AppointmentController.listMyAppointmentsAdvanced);
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

routes.post("/checkout", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin], CheckoutController.createCheckout);
routes.get("/checkout", [authJwt.verifyToken, authJwt.verifyPermission], CheckoutController.listAllCheckouts);
routes.get("/checkout/appointment", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isSuperAdmin], CheckoutController.listCheckoutByIdAppointment);
routes.get("/checkout/:id", [authJwt.verifyToken, authJwt.verifyPermission], CheckoutController.listCheckoutById);
routes.get("/checkout/band/:id_band", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isSuperAdmin], CheckoutController.listCheckoutByIdBand);
routes.patch("/checkout/:id", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin], CheckoutController.updateCheckout);
routes.delete("/checkout/:id", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isSuperAdmin], CheckoutController.deleteCheckout);

routes.post("/creditor", [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin], CreditorController.createCreditor);
routes.get("/creditor", [authJwt.verifyToken], CreditorController.listAllCreditors);
routes.get("/creditor/:id", [authJwt.verifyToken], CreditorController.listCreditorById);
routes.patch("/creditor/:id", [authJwt.verifyToken, authJwt.isSuperAdmin], CreditorController.updateCreditor);
routes.delete("/creditor/:id", [authJwt.verifyToken, authJwt.isSuperAdmin], CreditorController.deleteCreditor);
routes.get("/", (req, res) => res.json({ message: "Nice, last update - checkout finances control with appointments" }));

module.exports = routes;
