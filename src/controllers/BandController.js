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
	}
}