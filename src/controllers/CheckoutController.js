const Checkout = require("../models/Checkout");
const Band = require("../models/Band");
const Creditor = require("../models/Creditor");
const Appointment = require("../models/Appointment")


const Sequelize = require("sequelize");
const Op = Sequelize.Op;
require("dotenv/config");

const config = require("../config/auth");

const include = [
  { model: Band, as: "band" }, { model: Creditor, as: "creditor" },
  { model: Appointment, as: "appointment" }
]

module.exports = {
  async createCheckout(req, res) {
    try {
      const { value, type } = req.body;

      if (!value || !type) {
        return res.status(403).json({
          error: "Valor, tipo do Checkout é obrigatório",
        });
      }

      const newCheckout = {
        value: value,
        owner: req.body.owner,
        type: type,
        description: req.body.description,
        date: req.body.date,
        id_band: req.body.id_band,
        id_creditor: req.body.id_creditor,
        id_appointment: req.body.id_appointment,
      };

      const createdCheckout = await Checkout.create(newCheckout);

      return res.status(201).json(createdCheckout);
    } catch (e) {
      return res.status(500).json({ error: e.toString(), fields: e.fields });
    }
  },

  async listAllCheckouts(req, res) {
    try {
      const { idBand, endDate, startDate } = req.query;
      if ((idBand, endDate, startDate)) {
        const allCheckoutsFiltered = await Checkout.findAll({
          where: {
            date: {
              [Op.gt]: startDate,
              [Op.lt]: endDate,
            },
            id_band: {
              [Op.eq]: idBand,
            },
            is_deleted: {
              [Op.eq]: false,
            },
          },
          include,
          order: [["date", "DESC"]],
        });
        return res.status(200).json(allCheckoutsFiltered);
      }
      const allCheckouts = await Checkout.findAll({
        include,
        where: {
          is_deleted: {
            [Op.eq]: false,
          },
        },
        order: [["date", "DESC"]],
      });

      return res.status(200).json(allCheckouts);
    } catch (e) {
      return res.status(500).json({ error: e.toString(), fields: e.fields });
    }
  },

  async listCheckoutById(req, res) {
    try {
      const id = req.params.id;
      const checkout = await Checkout.findByPk(id, {
        include: include,
        order: [["date", "DESC"]],
      });
      if (!checkout) {
        return res.status(404).json({ error: "Checkout não encontrado" });
      }

      return res.status(200).json(checkout);
    } catch (e) {
      return res.status(500).json({ error: e.toString(), fields: e.fields });
    }
  },

  async listCheckoutByIdBand(req, res) {
    try {
      const idBand = req.params.id_band;
      const allCheckoutsFiltered = await Checkout.findAll({
        include: include,
        order: [["date", "DESC"]],
        where: {
          id_band: {
            [Op.eq]: idBand,
          },
        },
      });
      return res.status(200).json(allCheckoutsFiltered);
    } catch (e) {
      return res.status(500).json({ error: e.toString(), fields: e.fields });
    }
  },

  async listCheckoutByIdAppointment(req, res) {
    try {
      const { ids_appointments, id_band } = req.params;
      const allCheckoutsArray = []
      const list = ids_appointments.split(',')
      if (list) {

        const promises = await list.map(async (id) => {
          const allCheckoutsFiltered = await Checkout.findAll({
            include,
            order: [["date", "DESC"]],
            where: {
              id_appointment: {
                [Op.eq]: id,
              },
              id_band: {
                [Op.eq]: id_band,
              }
            },
          }).then((checkouts) => checkouts.map((item) => item.dataValues));

          return allCheckoutsArray.push(...allCheckoutsFiltered);
        });
        await Promise.all(promises);
        console.log(allCheckoutsArray.length)
        return res.status(200).json(allCheckoutsArray);
      }
      return res.status(200).json([]);

    } catch (e) {
      return res.status(500).json({ error: e.toString(), fields: e.fields });
    }
  },



  async updateCheckout(req, res) {
    try {
      const id = req.params.id;
      const checkout = await Checkout.findByPk(id);

      if (!checkout) {
        return res.status(404).json({ error: "Checkout não encontrado" });
      }

      const { ...data } = req.body;

      Checkout.update(data, { where: { id: id } });

      return res.status(200).json({ success: "Checkout atualizado" });
    } catch (e) {
      return res.status(500).json({ error: e.toString(), fields: e.fields });
    }
  },

  async deleteCheckout(req, res) {
    try {
      const id = req.params.id;
      const checkout = await Checkout.findByPk(id);

      if (!checkout) {
        return res.status(404).json({ error: "Checkout não encontrado" });
      }

      Checkout.destroy({ where: { id: id } });

      return res.status(204).json({ success: "Checkout deletado com sucesso" });
    } catch (e) {
      return res.status(500).json({ error: e.toString(), fields: e.fields });
    }
  },
};
