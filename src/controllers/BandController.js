const User = require('../models/User');
const Band = require('../models/Band');

const Sequelize = require('sequelize')
const Op = Sequelize.Op;
require("dotenv/config");

const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const config = require("../config/auth");

module.exports = {
	async createBand(req, res) {
		try {
			const { email, name, owner } = req.body
			const salt = bcrypt.genSaltSync(parseInt(process.env.ENCRYPT_SALT))
			if (!name) {
				return res.status(403).json({ error: "Nome da banda é obrigatório" })
			}
			const band = await Band.findOne({ where: { name: name } })
			if (band) {
				if (band.is_deleted) {
					const bandRecreated = Band.update({ is_deleted: false, email: email ? bcrypt.hashSync(email, salt) : null, owner: owner || req.userId, cellphone: req.body.cellphone }, { where: { id: band.id } })
					return res.status(200).json(bandRecreated)
				}
				return res.status(409).json({ error: 'Banda já cadastrada' })
			}
			const newBand = {
				name: req.body.name,
				email: email,
				cellphone: req.body.cellphone,
				owner: owner || req.userId
			}

			const createdBand = await Band.create(newBand)

			return res.status(201).json(createdBand)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async listAllBands(req, res) {
		try {
			const name = req.query?.name

			if (name) {
				const allBandsFiltered = await Band.findAll({
					where: {
						name: {
							[Op.iLike]: `%${name}%`
						}
					}
				});
				return res.status(200).json(allBandsFiltered);
			}
			const allBands = await Band.findAll()

			return res.status(200).json(allBands)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async listBandById(req, res) {
		try {
			const id = req.params.id
			const band = await Band.findByPk(id)
			if (!band) {
				return res.status(404).json({ error: 'Banda não encontrada' })
			}

			if (band.owner !== req.userId && !req.isSuperAdmin) {
				return res.status(401).json({ error: "Ação não autorizada" })
			}
			return res.status(200).json(band)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async listBandByUserId(req, res) {
		try {
			const id = req.params.id
			const band = await Band.findAll({ where: { owner: id } })
			if (!band) {
				return res.status(404).json({ error: 'Banda não encontrada' })
			}

			return res.status(200).json(band)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async updateBand(req, res) {
		try {
			const id = req.params.id
			const band = await Band.findByPk(id)

			if (!band) {
				return res.status(404).json({ error: "Banda não encontrada" })
			}

			const { ...data } = req.body
			const isOwner = band.owner === req.userId || req.isSuperAdmin

			if (!isOwner) {
				return res.status(401).json({ error: 'Ação não autorizada' })
			}
			Band.update(data, { where: { id: id } })

			return res.status(200).json({ success: "Banda atualizada" })
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async deleteBand(req, res) {
		try {

			const id = req.params.id
			const band = await Band.findByPk(id)

			if (!band) {
				return res.status(404).json({ error: "Banda não encontrada" })
			}

			const isOwner = band.owner === req.userId || req.isSuperAdmin

			if (!isOwner) {
				return res.status(401).json({ error: 'Ação não autorizada' })
			}

			Band.update({ is_deleted: true }, { where: { id: id } })

			return res.status(204).json({ success: "Usuário deletado" })
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	}
}