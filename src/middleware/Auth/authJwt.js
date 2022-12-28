const jwt = require("jsonwebtoken");
const config = require("../../config/auth");
const User = require("../../application/models/User").default;

verifyToken = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.id;
      req.isSuperAdmin = decoded.super_admin;
    });
    next();
  } catch (e) {
    return res.status(500).json({ error: e.toString(), fields: e.fields });
  }
};

isAdmin = async (req, res, next) => {
  try {
    User.findByPk(req.userId).then((user) => {
      const isAdmin = user.admin;

      if (!isAdmin) {
        res.status(403).send({
          message: "Ação permitida apenas ao administrador!",
        });
      }
      return;
    });

    next();
  } catch (e) {
    return res.status(500).json({ error: e.toString(), fields: e.fields });
  }
};

isSuperAdmin = async (req, res, next) => {
  try {
    User.findByPk(req.userId).then((user) => {
      const isSuperAdmin = user.super_admin;

      if (!isSuperAdmin) {
        res.status(403).send({
          message: "Ação permitida apenas ao administrador!",
        });
      }
      return;
    });

    next();
  } catch (e) {
    return res.status(500).json({ error: e.toString(), fields: e.fields });
  }
};

verifyPermission = async (req, res, next) => {
  try {
    User.findByPk(req.userId).then((user) => {
      const isDeleted = user.is_deleted;

      if (isDeleted) {
        res.status(403).send({
          message: "Você não tem mais acesso, entre em contato com o administrador!",
        });
      }
      return;
    });

    next();
  } catch (e) {
    return res.status(500).json({ error: e.toString(), fields: e.fields });
  }
};

const authJwt = {
  verifyToken: verifyToken,
  isSuperAdmin: isSuperAdmin,
  isAdmin: isAdmin,
  verifyPermission: verifyPermission,
};

module.exports = authJwt;
