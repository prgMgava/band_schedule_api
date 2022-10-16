const User = require('../models/User');
const Band = require('../models/Band');

const Sequelize = require('sequelize')
const Op = Sequelize.Op;
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

			const salt = bcrypt.genSaltSync(parseInt(process.env.ENCRYPT_SALT))

			const newUser = {
				username: req.body.username,
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: bcrypt.hashSync(req.body.email, salt),
				cellphone: req.body.cellphone,
				password: bcrypt.hashSync(req.body.password, salt),
				admin: true
			}

			const createdUser = await User.create(newUser)

			return res.status(201).json(createdUser)
		} catch (e) {
			return res.status(500).json({ error: e.toString() })
		}
	},

	async createMember(req, res) {
		try {

			const salt = bcrypt.genSaltSync(parseInt(process.env.ENCRYPT_SALT))

			const newUser = {
				username: req.body.username,
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: bcrypt.hashSync(req.body.email, salt),
				cellphone: req.body.cellphone,
				password: bcrypt.hashSync(req.body.password, salt),
				admin: false,
			}

			const createdUser = await User.create(newUser)

			return res.status(201).json(createdUser)
		} catch (e) {
			return res.status(500).json({ error: e.toString() })
		}
	},

	async listAllUsers(req, res) {
		try {
			const name = req.query?.name

			if (name) {
				const allUsersFiltered = await User.findAll({
					include: { model: Band, as: 'band', attributes: ['id', 'name', 'email', 'status'] },
					where: {
						[Op.or]: [{
							username: {
								[Op.iLike]: `%${name}%`
							}
						}, {
							first_name: {
								[Op.iLike]: `%${name}%`
							}
						},
						{
							last_name: {
								[Op.iLike]: `%${name}%`
							}
						}
						]
					}
				});
				return res.status(200).json(allUsersFiltered);

			}

			const allUsers = await User.findAll({ include: { model: Band, as: 'band', attributes: ['id', 'name', 'email', 'status'] } });

			return res.status(200).json(allUsers);
		} catch (e) {
			return res.status(500).json({ error: e.toString() })
		}
	},

	async listUserById(req, res) {
		try {
			const id = req.params.id
			const user = await User.findByPk(id)

			return res.status(200).json(user)
		} catch (e) {
			return res.status(500).json({ error: e.toString() })
		}
	},

	async updateUser(req, res) {
		try {
			const id = req.params.id
			const user = await User.findByPk(id)

			if (!user) {
				return res.status(404).json({ error: 'Usuário não encontrado' })
			}

			//TODO: password update with code via email
			const { ...data } = req.body
			const isOwner = user.id === req.userId

			if (!isOwner) {
				return res.status(401).json({ error: 'Ação não autorizada' })
			}
			User.update(data, { where: { id: id } })

			return res.status(200).json({ success: "Usuário atualizado" })
		} catch (e) {
			return res.status(500).json({ error: e.toString() })
		}
	},

	async deleteUser(req, res) {
		try {

			const id = req.params.id
			const user = await User.findByPk(id)

			if (!user) {
				return res.status(404).json({ error: 'Usuário não encontrado' })
			}

			if (user.super_admin) {
				return res.status(403).json({ error: "Super admin não pede ser deletado" })
			}

			User.destroy({ where: { id: id } })

			return res.status(204).json({ success: "Usuário deletado" })
		} catch (e) {
			return res.status(500).json({ error: e.toString() })
		}
	}
}