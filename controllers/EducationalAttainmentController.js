const { Op } = require("sequelize");
const { EducationalAttainment } = require('../models');

exports.getAllEducationalAttainments = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await EducationalAttainment.findAndCountAll({
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

exports.getEducationalAttainment = async (req, res) => {
    try {
        const ea = await EducationalAttainment.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(ea);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createEducationalAttainment = async (req, res) => {
    const { name } = req.body;
    try {
        const eaExist = await EducationalAttainment.findOne({
            where: { 
                [Op.or]: [{ Name: name }] 
            }
        });
        if (eaExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Educational attainment already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const ea = await EducationalAttainment.create({ Name: name });
        res.status(201).json({ message: "Educational attainment created successfully.", ea });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateEducationalAttainment = async (req, res) => {

    const { id } = req.params;
    const { name } = req.body;
  
    try {
        const ea = await EducationalAttainment.findByPk(id);
        if (!ea) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Educational attainment not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const eaExist = await EducationalAttainment.findOne({
            where: {
                [Op.or]: [{ Name: name } ],
                Id: { [Op.ne]: id }
            },
        });
        if (eaExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Educational attainment is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await ea.update({ Name: name });
        res.status(200).json({ message: "Educational attainment updated successfully.", ea });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableEducationalAttainment = async (req, res) => {

    const { id } = req.params;
  
    try {
        const ea = await EducationalAttainment.findByPk(id);
        if (!ea) {
            return res.status(404).json({ error: "Educational attainment not found." });
        }
        await ea.update({ IsActive: false });
        res.status(200).json({ message: "Educational attainment disabled successfully.", ea });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableEducationalAttainment = async (req, res) => {

    const { id } = req.params;
  
    try {
        const ea = await EducationalAttainment.findByPk(id);
        if (!ea) {
            return res.status(404).json({ error: "Educational attainment not found." });
        }
        await ea.update({ IsActive: true });
        res.status(200).json({ message: "Educational attainment enabled successfully.", ea });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};