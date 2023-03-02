const Creditor = require("../models/Creditor");
const Band = require("../models/Band");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
require("dotenv/config");

const config = require("../config/auth");

module.exports = {
  async createCreditor(req, res) {
    try {
      const { is_supplier, name } = req.body;

      if (!name) {
        return res.status(403).json({
          error: "Nome da pessoa é obrigatório",
        });
      }

      const newCreditor = {
        is_supplier: is_supplier,
        name: name,
      };

      const createdCreditor = await Creditor.create(newCreditor);

      return res.status(201).json(createdCreditor);
    } catch (e) {
      return res.status(500).json({ error: e.toString(), fields: e.fields });
    }
  },

  async listAllCreditors(req, res) {
    console.log('aqui')
    try {
      const allCreditors = await Creditor.findAll({
        where: {
          is_deleted: {
            [Op.eq]: false,
          },
        },
      });
      return res.status(200).json(allCreditors);
    } catch (e) {
      return res.status(500).json({ error: e.toString(), fields: e.fields });
    }
  },

  async listCreditorById(req, res) {
    try {
      const id = req.params.id;
      const checkout = await Creditor.findByPk(id);
      if (!checkout) {
        return res.status(404).json({ error: "Credor não encontrado" });
      }

      return res.status(200).json(checkout);
    } catch (e) {
      return res.status(500).json({ error: e.toString(), fields: e.fields });
    }
  },

  async updateCreditor(req, res) {
    try {
      const id = req.params.id;
      const checkout = await Creditor.findByPk(id);

      if (!checkout) {
        return res.status(404).json({ error: "Credor não encontrado" });
      }

      const { ...data } = req.body;

      Creditor.update(data, { where: { id: id } });

      return res.status(200).json({ success: "Credor atualizado" });
    } catch (e) {
      return res.status(500).json({ error: e.toString(), fields: e.fields });
    }
  },

  async deleteCreditor(req, res) {
    try {
      const id = req.params.id;
      const checkout = await Creditor.findByPk(id);

      if (!checkout) {
        return res.status(404).json({ error: "Credor não encontrado" });
      }

      Creditor.destroy({ where: { id: id } });

      return res.status(204).json({ success: "Credor deletado com sucesso" });
    } catch (e) {
      return res.status(500).json({ error: e.toString(), fields: e.fields });
    }
  },
};
