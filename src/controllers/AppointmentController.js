const Appointment = require('../models/Appointment');
const Band = require('../models/Band');
const User = require('../models/User');

const Sequelize = require('sequelize')
const Op = Sequelize.Op;
require("dotenv/config");

module.exports = {
	async createAppointment(req, res) {
		try {
			const bandIdFromSuperAdmin = req.query.id_band
			const user = await User.findByPk(req.userId, { include: { model: Band, as: 'band', attributes: ['id'] } })

			const newAppointment = {
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
				newAppointment.status = status
			}

			console.log(newAppointment)

			const createdAppointment = await Appointment.create(newAppointment)

			return res.status(201).json(createdAppointment)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async listAllAppointments(req, res) {
		try {
			if (req.query?.start_date && req.query?.end_date) {
				const allAppointmentsFiltered = await Appointment.findAll({
					where: {
						start_date: {
							[Op.gt]: req.query?.start_date
						},
						end_date: {
							[Op.lt]: req.query?.end_date
						}

					},
					include: { model: Band, as: 'band' }
				});
				return res.status(200).json(allAppointmentsFiltered);
			}
			const allAppointments = await Appointment.findAll({ include: { model: Band, as: 'band' } })

			return res.status(200).json(allAppointments)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async listAppointmentById(req, res) {
		try {
			const id = req.params.id
			const appointment = await Appointment.findByPk(id, { include: { model: Band, as: 'band' } })

			if (!appointment) {
				return res.status(404).json({ error: 'Compromisso não encontrado' })
			}

			return res.status(200).json(appointment)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async listAppointmentByBandId(req, res) {
		try {
			const id = req.params.id
			const appointment = await Appointment.findOne({ where: { id_band: id }, include: { model: Band, as: 'band' } })

			if (!appointment) {
				return res.status(404).json({ error: 'Compromisso não encontrado' })
			}

			return res.status(200).json(appointment)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async updateAppointment(req, res) {
		try {
			const id = req.params.id
			const appointment = await Appointment.findByPk(id, { include: { model: Band, as: 'band' } })

			if (!appointment) {
				return res.status(404).json({ error: "Compromisso não encontrado" })
			}

			const { ...data } = req.body
			const isOwner = appointment.band.owner === req.userId || req.isSuperAdmin

			if (!isOwner) {
				return res.status(401).json({ error: 'Ação não autorizada' })
			}
			Appointment.update(data, { where: { id: id } })

			return res.status(200).json({ success: "Compromisso atualizad" })
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async deleteAppointment(req, res) {
		try {

			const id = req.params.id
			const appointment = await Appointment.findByPk(id, { include: { model: Band, as: 'band' } })

			if (!appointment) {
				return res.status(404).json({ error: "Compromisso não encontrada" })
			}

			const isOwner = appointment.band.owner === req.userId || req.isSuperAdmin

			if (!isOwner) {
				return res.status(401).json({ error: 'Ação não autorizada' })
			}

			Appointment.destroy({ where: { id: id } })

			return res.status(204).json({ success: "Usuário deletado" })
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	}
}