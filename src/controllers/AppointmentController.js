const Appointment = require('../models/Appointment');
const Band = require('../models/Band');
const User = require('../models/User');

const Sequelize = require('sequelize');
const Label = require('../models/Label');
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
				id_band: user.band?.id || req.body?.id_band,
				start_date: req.body.start_date,
				end_date: req.body.end_date,
				street: req.body.street,
				district: req.body.district,
				state: req.body.state,
				city: req.body.city,
				address_number: req.body.address_number,
				address_complement: req.body.address_complement,
				id_label: req.body.id_label,
				event: req.body.event,
				money: req.body.money,
				company_name: req.body.company_name,
				contractor: req.body.contractor,
				company_cellphone: req.body.company_cellphone,
				company_contact: req.body.company_contact,
				company_email: req.body.company_email,
				emphasis: req.body.emphasis,
				observations: req.body.observations,
				creator: req.body.creator,
				expanse: req.body.expanse,
			}


			const status = req.body.status
			if (status) {
				newAppointment.status = status
			}

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
			const allAppointments = await Appointment.findAll({ include: [{ model: Band, as: 'band' }, { model: Label, as: 'label' }] })

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
			if (req.query?.start_date && req.query?.end_date) {
				const allAppointmentsFiltered = await Appointment.findAll({
					where: {
						start_date: {
							[Op.gt]: req.query?.start_date
						},
						end_date: {
							[Op.lt]: req.query?.end_date
						},
						id_band: {
							[Op.eq]: id
						}

					},
					include: { model: Band, as: 'band' }
				});
				return res.status(200).json(allAppointmentsFiltered);
			}
			const appointment = await Appointment.findAll({ where: { id_band: id }, include: { model: Band, as: 'band' } })

			if (!appointment) {
				return res.status(404).json({ error: 'Compromisso não encontrado' })
			}

			return res.status(200).json(appointment)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async listMyAppointments(req, res) {
		try {
			const id = req.params.id
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
					include: { model: Band, as: 'band', where: { owner: id } }
				});
				return res.status(200).json(allAppointmentsFiltered);
			}
			const appointment = await Appointment.findAll({ include: { model: Band, as: 'band', where: { owner: id } } })

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

			return res.status(200).json({ success: "Compromisso atualizado" })
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async updateAppointmentStatus(req, res) {
		try {
			const currentDate = req.query?.current_date
			if (!currentDate) {
				return res.status(500).json({ error: 'Informe uma data atual nos parâmetros' })
			}
			const appointments = await Appointment.findAll({
				where: {
					status: {
						[Op.notLike]: '%concluido%'
					},
					end_date: {
						[Op.lt]: currentDate
					}
				}
			})

			if (!appointments.length) {
				return res.status(200).json({ success: "Todos os compromisso já foram atualizados" })
			}

			appointments.map(appointment => {
				Appointment.update({ status: 'concluido' }, { where: { id: appointment.id } })
			})


			return res.status(200).json({ success: `Foram atualizados ${appointments.length} compromissos com sucesso`, amount: appointments.length })
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
	},
}