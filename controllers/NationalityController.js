const { Op } = require("sequelize");
const { Nationality } = require('../models');
const nationality = require("../models/nationality");

exports.getAllNationalities = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await Nationality.findAndCountAll({
            Limit,
            Offset,
            order: [['Id', 'ASC']]
        });
        res.json({
            Data: rows,
            Meta: {
                TotalItems: count,
                TotalPages: Math.ceil(count / Limit),
                CurrentPage: Page
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getNationality = async (req, res) => {
    try {
        const nationalities = await Nationality.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(nationalities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createNationality = async (req, res) => {
    const { name } = req.body;
    try {
        const nationalityExist = await Nationality.findOne({
            where: { 
                [Op.or]: [{ Name: name }] 
            }
        });
        if (nationalityExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Nationality already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const nationality = await Nationality.create({ Name: name });
        res.status(201).json({ message: "Nationality created successfully.", nationality });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateNationality = async (req, res) => {

    const { id } = req.params;
    const { name } = req.body;
  
    try {
        const nationality = await Nationality.findByPk(id);
        if (!nationality) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Nationality not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const nationalityExist = await Nationality.findOne({
            where: {
                [Op.or]: [{ Name: name } ],
                Id: { [Op.ne]: id }
            },
        });
        if (nationalityExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Nationality is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await nationality.update({ Name: name });
        res.status(200).json({ message: "Nationality updated successfully.", nationality });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableNationality = async (req, res) => {

    const { id } = req.params;
  
    try {
        const nationality = await Nationality.findByPk(id);
        if (!nationality) {
            return res.status(404).json({ error: "Nationality not found." });
        }
        await nationality.update({ IsActive: false });
        res.status(200).json({ message: "Nationality disabled successfully.", nationality });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableNationality = async (req, res) => {

    const { id } = req.params;
  
    try {
        const nationality = await Nationality.findByPk(id);
        if (!nationality) {
            return res.status(404).json({ error: "Nationality not found." });
        }
        await nationality.update({ IsActive: true });
        res.status(200).json({ message: "Nationality enabled successfully.", nationality });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};