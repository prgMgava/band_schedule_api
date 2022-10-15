const User = require('../models/User');
require("dotenv/config");

const bcrypt = require("bcrypt");

module.exports = {
	async login(req, res) {
		const user = await User.findOne({ where: { username } })
	},

	async createAdmin(req, res) {
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

		res.status(201).json(createdUser)
	}
}