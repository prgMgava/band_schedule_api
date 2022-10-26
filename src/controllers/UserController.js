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
			if (user.is_deleted) {
				return res.status(403).json({
					error: "Você não tem mais acesso. Entre em contato com o administrador"
				})
			}
			if (user) {
				const passwordValid = bcrypt.compareSync(req.body.password, user.password)
				if (!passwordValid) {
					return res.status(401).json({
						error: "Senha Inválida"
					})
				}

				const token = jwt.sign({ id: user.id, adm: user.admin, super_admin: user.super_admin }, config.secret)

				return res.status(200).json({ success: 'Login efetuado com sucesso', token: token })
			}
			return res.status(404).json({ error: "Usuário não encontrado" })
		} catch (e) {
			return res.status(500).json({ error: "Login failed" })
		}
	},

	async createAdmin(req, res) {
		try {
			const { username, email } = req.body
			if (!username) {
				return res.status(403).json({ error: "Username é obrigatório" })
			}
			const salt = bcrypt.genSaltSync(parseInt(process.env.ENCRYPT_SALT))
			const adm = await User.findOne({
				where: {
					[Op.or]: [{
						username: username
					}, {
						email: bcrypt.hashSync(email || 'undefined', salt)
					}
					]
				}
			})

			if (adm) {
				return res.status(409).json({ error: "Username ou email já existe" })
			}


			const newUser = {
				username: username,
				email: email ? bcrypt.hashSync(email, salt) : null,
				cellphone: req.body.cellphone,
				password: bcrypt.hashSync(req.body.password, salt),
				admin: true
			}

			const createdUser = await User.create(newUser)

			return res.status(201).json(createdUser)
		} catch (e) {
			//TODO: handling errors correctly
			// if (e instanceof Sequelize.UniqueConstraintError) {
			// 	return res.status(409).json({ error: e.errors, fields: e.fields })
			// }
			return res.status(500).json({ error: e.toString(), fields: e.fields, fields: e.fields })
		}
	},

	async createMember(req, res) {
		try {
			const { username, email } = req.body
			if (!username) {
				return res.status(403).json({ error: "Username é obrigatório" })
			}
			const salt = bcrypt.genSaltSync(parseInt(process.env.ENCRYPT_SALT))
			const user = await User.findOne({
				where: {
					[Op.or]: [{
						username: username
					}, {
						email: bcrypt.hashSync(email || 'undefined', salt)
					}
					]
				}
			})

			if (user) {
				return res.status(409).json({ error: "Username ou email já existe" })
			}

			const newUser = {
				username: username,
				email: email ? bcrypt.hashSync(email, salt) : null,
				cellphone: req.body.cellphone,
				password: bcrypt.hashSync(req.body.password, salt),
				admin: false,
			}

			const createdUser = await User.create(newUser)

			return res.status(201).json(createdUser)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async listAllUsers(req, res) {
		try {
			const name = req.query?.name

			if (name) {
				const allUsersFiltered = await User.findAll({
					include: { model: Band, as: 'band', attributes: ['id', 'name', 'email'] },
					where: {
						[Op.or]: [{
							username: {
								[Op.iLike]: `%${name}%`
							}
						}
						]
					}
				});
				return res.status(200).json(allUsersFiltered);

			}

			const allUsers = await User.findAll({ attributes: { exclude: ['password'] }, include: { model: Band, as: 'band', attributes: ['id', 'name', 'email'] } });

			return res.status(200).json(allUsers);
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async listUserById(req, res) {
		try {
			const id = req.params.id
			const user = await User.findByPk(id, { attributes: { exclude: ['password'] } })

			if (!user) {
				return res.status(404).json({ error: 'Usuário não encontrado' })
			}


			return res.status(200).json(user)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async listAdm(req, res) {
		try {
			const admins = await User.findAll({ where: { admin: true }, attributes: { exclude: ['password'] } })

			return res.status(200).json(admins)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async listMember(req, res) {
		try {
			const members = await User.findAll({ where: { admin: false }, attributes: { exclude: ['password'] } })

			return res.status(200).json(members)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
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
			const { password, ...data } = req.body

			const salt = bcrypt.genSaltSync(parseInt(process.env.ENCRYPT_SALT))

			if (password) {
				const hashPassword = bcrypt.hashSync(req.body.password, salt)
				data.password = hashPassword
			}

			User.update(data, { where: { id: id } })

			return res.status(200).json({ success: "Usuário atualizado" })
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
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

			User.update({ is_deleted: true }, { where: { id: id } })

			return res.status(204).json({ success: "Usuário desativado" })
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	}
}