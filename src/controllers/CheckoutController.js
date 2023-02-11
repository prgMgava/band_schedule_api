const User = require('../models/User');
const Checkout = require('../models/Checkout');

const Sequelize = require('sequelize')
const Op = Sequelize.Op;
require("dotenv/config");

const config = require("../config/auth");

module.exports = {
	async createCheckout(req, res) {
		try {
			const { value, owner, type } = req.body
			if (!value || !owner || !type) {
				return res.status(403).json({ error: "Valor, tipo e reponsável do Checkout é obrigatório" })
			}
			
			const newCheckout = {
				value: value,
				owner: owner,
				type: type,
				description: req.body.description,
				date: req.body.date,
				id_band: req.body.id_band,
			}

			const createdCheckout = await Checkout.create(newCheckout)

			return res.status(201).json(createdCheckout)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async listAllCheckouts(req, res) {
		try {
			const { idBand, endDate, startDate } = req.query;


			if (idBand, endDate, startDate ) {
				const allCheckoutsFiltered = await Checkout.findAll({
					where: {
						date: {
							[Op.gt]: startDate,
							[Op.lt]: endDate
						},
						id_band: {
							[Op.eq]: idBand
						}
					}
				});
				return res.status(200).json(allCheckoutsFiltered);
			}
			const allCheckouts = await Checkout.findAll()

			return res.status(200).json(allCheckouts)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async listCheckoutById(req, res) {
		try {
			const id = req.params.id
			const checkout = await Checkout.findByPk(id)
			if (!checkout) {
				return res.status(404).json({ error: 'Checkout não encontrado' })
			}

			return res.status(200).json(checkout)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async listCheckoutByIdBand(req, res) {
		try {
			const idBand = req.params.id_band
			const allCheckoutsFiltered = await Checkout.findAll({
				where: {
					id_band: {
						[Op.eq]: idBand
					}
				}
			});
			return res.status(200).json(allCheckoutsFiltered);

		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async updateCheckout(req, res) {
		try {
			const id = req.params.id
			const checkout = await Checkout.findByPk(id)

			if (!checkout) {
				return res.status(404).json({ error: "Checkout não encontrado" })
			}

			const { ...data } = req.body

			Checkout.update(data, { where: { id: id } })

			return res.status(200).json({ success: "Checkout atualizado" })
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async deleteCheckout(req, res) {
		try {

			const id = req.params.id
			const checkout = await Checkout.findByPk(id)

			if (!checkout) {
				return res.status(404).json({ error: "Checkout não encontrado" })
			}

			Checkout.update({ is_deleted: true }, { where: { id: id } })

			return res.status(204).json({ success: "Checkout deletado com sucesso" })
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	}
}