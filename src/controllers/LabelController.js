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
			const labelEdited = title.toUpperCase()
			const label = await Label.findOne({ where: { title: labelEdited } })
			if (label) {
				if (label.is_deleted) {
					const labelRecreated = Label.update({ is_deleted: false, color: color }, { where: { id: label.id } })
					return res.status(200).json(labelRecreated)
				}
				return res.status(409).json({ error: 'Label já cadastrada' })
			}
			const colorLabel = await Label.findOne({ where: { color: color } })
			if (colorLabel) {
				return res.status(409).json({ error: 'Cor já cadastrada' })

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
			const title = req.query?.title

			if (title) {
				const allLabelsFiltered = await Label.findAll({
					where: {
						title: {
							[Op.iLike]: `%${title}%`
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
			const label = await Label.findByPk(id)
			if (!label) {
				return res.status(404).json({ error: 'Label não encontrada' })
			}

			return res.status(200).json(label)
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async updateLabel(req, res) {
		try {
			const id = req.params.id
			const label = await Label.findByPk(id)

			if (!label) {
				return res.status(404).json({ error: "Label não encontrada" })
			}

			const { ...data } = req.body
			if (data.title) {
				const labelName = await Label.findOne({ where: { title: data.title.toLowerCase() } })
				if (labelName && labelName.id != id) {
					return res.status(409).json({ error: "Nome de Label já existe" })
				}
				data.title = data.title.toLowerCase()
			}

			if (data.color) {
				const labelColor = await Label.findOne({ where: { color: data.color } })
				if (labelColor && labelColor.id != id) {
					return res.status(409).json({ error: "Cor de Label já existe" })
				}
			}

			Label.update(data, { where: { id: id } })

			return res.status(200).json({ success: "Label atualizada" })
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	},

	async deleteLabel(req, res) {
		try {

			const id = req.params.id
			const label = await Label.findByPk(id)

			if (!label) {
				return res.status(404).json({ error: "Label não encontrada" })
			}

			Label.update({ is_deleted: true }, { where: { id: id } })

			return res.status(204).json({ success: "Label deletada com sucesso" })
		} catch (e) {
			return res.status(500).json({ error: e.toString(), fields: e.fields })
		}
	}
}