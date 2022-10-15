const jwt = require("jsonwebtoken")
const config = require("../../config/auth");
const connection = require("../../database/index")
const User = require("../../models/User")

verifyToken = (req, res, next) => {
	try {
		const token = req.headers["x-access-token"];

		if (!token) {
			return res.status(403).send({
				message: "No token provided!"
			});
		}

		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				return res.status(401).send({
					message: "Unauthorized!"
				});
			}
			req.userId = decoded.id;
		});
		next();
	} catch (e) {
		return res.status(500).json({ error: e.toString() })
	}
};

isAdmin = (req, res, next) => {
	try {
		User.findByPk(req.userId).then(user => {
			console.log(user)
			const isAdmin = user.admin

			if (!isAdmin) {
				res.status(403).send({
					message: "Ação permitida apenas ao administrador!"
				});
			}
			return;
		});

		next()
	} catch (e) {
		return res.status(500).json({ error: e.toString() })
	}

	next()
};

isSuperAdmin = async (req, res, next) => {
	try {
		User.findByPk(req.userId).then(user => {
			console.log(user)
			const isSuperAdmin = user.super_admin

			if (!isSuperAdmin) {
				res.status(403).send({
					message: "Ação permitida apenas ao administrador!"
				});
			}
			return;
		});

		next()
	} catch (e) {
		return res.status(500).json({ error: e.toString() })
	}
};

const authJwt = {
	verifyToken: verifyToken,
	isSuperAdmin: isSuperAdmin,
};

module.exports = authJwt;