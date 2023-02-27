import { Router } from "express";
import { authJwt } from "./middleware/index";

import {
  listAllUsers,
  listAdm,
  listMember,
  listUserById,
  createAdmin,
  createMember,
  updateUser,
  deleteUser,
  login,
} from "./controllers/UserController";
import {
  createBand,
  listAllBands,
  listBandById,
  listBandByUserId,
  updateBand,
  deleteBand,
} from "./controllers/BandController";
import {
  createAppointment,
  listAllAppointments,
  listMyAppointmentsAdvanced,
  listAppointmentById,
  listMyAppointments,
  listAppointmentByBandId,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment,
} from "./controllers/AppointmentController";
import {
  createLabel,
  listAllLabels,
  listLabelById,
  updateLabel,
  deleteLabel,
} from "./controllers/LabelController";

const routes = Router();

routes.get(
  "/user",
  [authJwt.verifyToken, authJwt.verifyPermission],
  listAllUsers
);
routes.get(
  "/user/adm",
  [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin],
  listAdm
);
routes.get(
  "/user/member",
  [authJwt.verifyToken, authJwt.verifyPermission],
  listMember
);
routes.get(
  "/user/:id",
  [authJwt.verifyToken, authJwt.verifyPermission],
  listUserById
);
routes.post(
  "/user/adm",
  [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isSuperAdmin],
  createAdmin
);
routes.post("/user/member", createMember);
routes.patch(
  "/user/:id",
  [authJwt.verifyToken, authJwt.verifyPermission],
  updateUser
);
routes.delete(
  "/user/:id",
  [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isSuperAdmin],
  deleteUser
);

routes.post("/login", login);

routes.post(
  "/band",
  [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin],
  createBand
);
routes.get(
  "/band",
  [authJwt.verifyToken, authJwt.verifyPermission],
  listAllBands
);
routes.get(
  "/band/:id",
  [authJwt.verifyToken, authJwt.verifyPermission],
  listBandById
);
routes.get(
  "/band/owner/:id",
  [authJwt.verifyToken, authJwt.verifyPermission],
  listBandByUserId
);
routes.patch(
  "/band/:id",
  [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin],
  updateBand
);
routes.delete(
  "/band/:id",
  [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isSuperAdmin],
  deleteBand
);

routes.post(
  "/appointment",
  [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin],
  createAppointment
);
routes.get(
  "/appointment",
  [authJwt.verifyToken, authJwt.verifyPermission],
  listAllAppointments
);
routes.get(
  "/appointment/:id/advanced",
  [authJwt.verifyToken, authJwt.verifyPermission],
  listMyAppointmentsAdvanced
);
routes.get(
  "/appointment/:id",
  [authJwt.verifyToken, authJwt.verifyPermission],
  listAppointmentById
);
routes.get(
  "/appointment/owner/:id",
  [authJwt.verifyToken, authJwt.verifyPermission],
  listMyAppointments
);
routes.get(
  "/appointment/band/:id",
  [authJwt.verifyToken, authJwt.verifyPermission],
  listAppointmentByBandId
);
routes.patch(
  "/appointment/:id",
  [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin],
  updateAppointment
);
routes.patch(
  "/appointment",
  [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin],
  updateAppointmentStatus
);
routes.delete(
  "/appointment/:id",
  [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin],
  deleteAppointment
);

routes.post(
  "/label",
  [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isAdmin],
  createLabel
);
routes.get(
  "/label",
  [authJwt.verifyToken, authJwt.verifyPermission],
  listAllLabels
);
routes.get(
  "/label/:id",
  [authJwt.verifyToken, authJwt.verifyPermission],
  listLabelById
);
routes.patch(
  "/label/:id",
  [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isSuperAdmin],
  updateLabel
);
routes.delete(
  "/label/:id",
  [authJwt.verifyToken, authJwt.verifyPermission, authJwt.isSuperAdmin],
  deleteLabel
);

routes.get("/", (req, res) =>
  res.json({ message: "Nice, deploy auto success, pm2 success" })
);

export default routes;
