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

			const salt = bcrypt.genSaltSync(parseInt(process.env.ENCRYPT_SALT))
			const newBand = {
				name: req.body.name,
				email: bcrypt.hashSync(req.body.email, salt),
				cellphone: req.body.cellphone,
				status: true,
				owner: req.userId
			}

			const createdBand = await Band.create(newBand)

			return res.status(201).json(createdBand)
		} catch (e) {
			return res.status(500).json({ error: e.toString() })
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
			return res.status(500).json({ error: e.toString() })
		}
	},

	async listBandById(req, res) {
		try {
			const id = req.params.id
			const band = await Band.findByPk(id)
			if (band.owner !== req.userId && !req.isSuperAdmin) {
				return res.status(401).json({ error: "Ação não autorizada" })
			}
			return res.status(200).json(band)
		} catch (e) {
			return res.status(500).json({ error: e.toString() })
		}
	},

	async listBandByUserId(req, res) {
		try {
			const id = req.params.id
			const band = await Band.findOne({ where: { owner: id } })

			return res.status(200).json(band)
		} catch (e) {
			return res.status(500).json({ error: e.toString() })
		}
	}
}