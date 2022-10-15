const User = require('../models/User');
require("dotenv/config");

const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const config = require("../config/auth");

module.exports = {
	async login(req, res) {
		try {
			const user = await User.findOne({ where: { username: req.body.username } })
			if (user) {
				const passwordValid = bcrypt.compareSync(req.body.password, user.password)
				if (!passwordValid) {
					res.status(401).json({
						error: "Senha Inválida"
					})
				}

				const token = jwt.sign({ id: user.id, adm: user.admin, superAdmin: user.super_admin }, config.secret)

				return res.status(200).json({ success: 'Login efetuado com sucesso', token: token })
			}
			return res.status(404).json({ error: "Usuário não encontrado" })
		} catch (e) {
			return res.status(500).json({ error: "Login failed" })
		}
	},

	async createAdmin(req, res) {
		try {

			const salt = bcrypt.genSaltSync(10)

			const newUser = {
				username: req.body.username,
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: bcrypt.hashSync(req.body.email, salt),
				cellphone: req.body.cellphone,
				password: bcrypt.hashSync(req.body.password, salt),
				admin: true,
				created_at: new Date(req.body.created_at),
				updated_at: new Date(req.body.updated_at)
			}

			const createdUser = await User.create(newUser)

			return res.status(201).json(createdUser)
		} catch (e) {
			return res.status(500).json({ error: e.toString() })
		}
	}
}