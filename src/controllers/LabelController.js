const User = require('../models/User');
const Label = require('../models/Label');

const Sequelize = require('sequelize')
const Op = Sequelize.Op;
require("dotenv/config");

const config = require("../config/auth");

module.exports = {
	async createLabel(req, res) {
		try {
			const { title, color } = req.body
			if (!title || !color) {
				return res.status(403).json({ error: "Nome e cor da Label é obrigatório" })
			}
			const labelEdited = title.toLowerCase()
			const label = await Label.findOne({ where: { title: labelEdited } })
			if (label) {
				return res.status(409).json({ error: 'Label já cadastrada' })
			}
			const newLabel = {
				title: labelEdited,
				color: color
			}

			const createdLabel = await Label.create(newLabel)

			return res.status(201).json(createdLabel)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async listAllLabels(req, res) {
		try {
			const name = req.query?.name

			if (name) {
				const allLabelsFiltered = await Label.findAll({
					where: {
						name: {
							[Op.iLike]: `%${name}%`
						}
					}
				});
				return res.status(200).json(allLabelsFiltered);
			}
			const allLabels = await Label.findAll()

			return res.status(200).json(allLabels)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async listLabelById(req, res) {
		try {
			const id = req.params.id
			const Label = await Label.findByPk(id)
			if (!Label) {
				return res.status(404).json({ error: 'Labela não encontrada' })
			}

			if (Label.owner !== req.userId && !req.isSuperAdmin) {
				return res.status(401).json({ error: "Ação não autorizada" })
			}
			return res.status(200).json(Label)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async listLabelByUserId(req, res) {
		try {
			const id = req.params.id
			const Label = await Label.findAll({ where: { owner: id } })
			if (!Label) {
				return res.status(404).json({ error: 'Labela não encontrada' })
			}

			return res.status(200).json(Label)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async updateLabel(req, res) {
		try {
			const id = req.params.id
			const Label = await Label.findByPk(id)

			if (!Label) {
				return res.status(404).json({ error: "Labela não encontrada" })
			}

			const LabelName = await Label.findOne({ where: { name: req.body.name } })
			if (LabelName) {
				return res.status(409).json({ error: "Nome de Labela já existe" })
			}
			const { ...data } = req.body
			const isOwner = Label.owner === req.userId || req.isSuperAdmin

			if (!isOwner) {
				return res.status(401).json({ error: 'Ação não autorizada' })
			}
			Label.update(data, { where: { id: id } })

			return res.status(200).json({ success: "Labela atualizada" })
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async deleteLabel(req, res) {
		try {

			const id = req.params.id
			const Label = await Label.findByPk(id)

			if (!Label) {
				return res.status(404).json({ error: "Labela não encontrada" })
			}

			const isOwner = Label.owner === req.userId || req.isSuperAdmin

			if (!isOwner) {
				return res.status(401).json({ error: 'Ação não autorizada' })
			}

			Label.destroy({ where: { id: id } })

			return res.status(204).json({ success: "Usuário deletado" })
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	}
}