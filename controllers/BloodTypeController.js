const { Op } = require("sequelize");
const { BloodType } = require('../models');

exports.getAllBloodTypes = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await BloodType.findAndCountAll({
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

exports.getBloodType = async (req, res) => {
    try {
        const types = await BloodType.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(types);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createBloodType = async (req, res) => {
    const { name } = req.body;
    try {
        const typeExist = await BloodType.findOne({
            where: { 
                [Op.or]: [{ Name: name }] 
            }
        });
        if (typeExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Blood type already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const type = await BloodType.create({ Name: name });
        res.status(201).json({ message: "Blood type created successfully.", type });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateBloodType = async (req, res) => {

    const { id } = req.params;
    const { name } = req.body;
  
    try {
        const type = await BloodType.findByPk(id);
        if (!type) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Blood type not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const typeExist = await BloodType.findOne({
            where: {
                [Op.or]: [{ Name: name } ],
                Id: { [Op.ne]: id }
            },
        });
        if (typeExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Blood type is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await type.update({ Name: name });
        res.status(200).json({ message: "Blood type updated successfully.", type });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableBloodType = async (req, res) => {

    const { id } = req.params;
  
    try {
        const type = await BloodType.findByPk(id);
        if (!type) {
            return res.status(404).json({ error: "Blood type not found." });
        }
        await type.update({ IsActive: false });
        res.status(200).json({ message: "Blood type disabled successfully.", type });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableBloodType = async (req, res) => {

    const { id } = req.params;
  
    try {
        const type = await BloodType.findByPk(id);
        if (!type) {
            return res.status(404).json({ error: "Blood type not found." });
        }
        await type.update({ IsActive: true });
        res.status(200).json({ message: "Blood type enabled successfully.", type });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};