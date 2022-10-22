const Event = require('../models/Event');
const Band = require('../models/Band');
const User = require('../models/User');

const Sequelize = require('sequelize')
const Op = Sequelize.Op;
require("dotenv/config");

module.exports = {
	async createEvent(req, res) {
		try {
			const bandIdFromSuperAdmin = req.query.id_band
			const user = await User.findByPk(req.userId, { include: { model: Band, as: 'band', attributes: ['id'] } })

			const newEvent = {
				title: req.body.title,
				cellphone: req.body.cellphone,
				id_band: user.band.id || bandIdFromSuperAdmin,
				start_date: req.body.start_date,
				end_date: req.body.end_date,
				street: req.body.street,
				district: req.body.district,
				state: req.body.state,
				city: req.body.city,
				address_number: req.body.address_number,
				address_complement: req.body.address_complement,
			}

			const status = req.body.status
			if (status) {
				newEvent.status = status
			}

			console.log(newEvent)

			const createdEvent = await Event.create(newEvent)

			return res.status(201).json(createdEvent)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async listAllEvents(req, res) {
		try {
			const start_date = req.query?.start_date ? new Date(req.query?.start_date) : new Date()
			var oneYearFromNow = new Date();
			oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
			const end_date = req.query?.end_date ? new Date(req.query.end_date) : oneYearFromNow


			if (req.query?.start_date || req.query?.end_date) {
				const allEventsFiltered = await Event.findAll({
					where: {
						date: {
							[Op.between]: [start_date, end_date]
						},

					},
					include: { model: Band, as: 'band' }
				});
				return res.status(200).json(allEventsFiltered);
			}
			const allEvents = await Event.findAll({ include: { model: Band, as: 'band' } })
			console.log('------------------------')

			return res.status(200).json(allEvents)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async listEventById(req, res) {
		try {
			const id = req.params.id
			const event = await Event.findByPk(id, { include: { model: Band, as: 'band' } })

			if (!event) {
				return res.status(404).json({ error: 'Evento não encontrado' })
			}

			return res.status(200).json(event)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async listEventByBandId(req, res) {
		try {
			const id = req.params.id
			const event = await Event.findOne({ where: { id_band: id }, include: { model: Band, as: 'band' } })

			if (!event) {
				return res.status(404).json({ error: 'Evento não encontrado' })
			}

			return res.status(200).json(event)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async updateEvent(req, res) {
		try {
			const id = req.params.id
			const event = await Event.findByPk(id, { include: { model: Band, as: 'band' } })

			if (!event) {
				return res.status(404).json({ error: "Evento não encontrado" })
			}

			const { ...data } = req.body
			const isOwner = event.band.owner === req.userId || req.isSuperAdmin

			if (!isOwner) {
				return res.status(401).json({ error: 'Ação não autorizada' })
			}
			Event.update(data, { where: { id: id } })

			return res.status(200).json({ success: "Evento atualizad" })
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async deleteEvent(req, res) {
		try {

			const id = req.params.id
			const event = await Event.findByPk(id, { include: { model: Band, as: 'band' } })

			if (!event) {
				return res.status(404).json({ error: "Eventa não encontrada" })
			}

			const isOwner = event.band.owner === req.userId || req.isSuperAdmin

			if (!isOwner) {
				return res.status(401).json({ error: 'Ação não autorizada' })
			}

			Event.destroy({ where: { id: id } })

			return res.status(204).json({ success: "Usuário deletado" })
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	}
}