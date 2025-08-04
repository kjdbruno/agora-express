const { Op } = require("sequelize");
const { Position } = require('../models');

exports.getAllPositions = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await Position.findAndCountAll({
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

exports.getPosition = async (req, res) => {
    try {
        const positions = await Position.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(positions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createPosition = async (req, res) => {
    const { Name } = req.body;
    try {
        const positionExist = await Position.findOne({
            where: { 
                [Op.or]: [{ Name }] 
            }
        });
        if (positionExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Position already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const position = await Position.create({ Name });
        res.status(201).json({ message: "Position created successfully.", position });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updatePosition = async (req, res) => {

    const { id } = req.params;
    const { Name } = req.body;
  
    try {
        const position = await Position.findByPk(id);
        if (!position) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Position not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const positionExist = await Position.findOne({
            where: {
                [Op.or]: [{ Name } ],
                Id: { [Op.ne]: id }
            },
        });
        if (positionExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Position is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await position.update({ Name });
        res.status(200).json({ message: "Position updated successfully.", position });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disablePosition = async (req, res) => {

    const { id } = req.params;
  
    try {
        const position = await Position.findByPk(id);
        if (!position) {
            return res.status(404).json({ error: "Position not found." });
        }
        await position.update({ IsActive: false });
        res.status(200).json({ message: "Position disabled successfully.", position });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enablePosition = async (req, res) => {

    const { id } = req.params;
  
    try {
        const position = await Position.findByPk(id);
        if (!position) {
            return res.status(404).json({ error: "Position not found." });
        }
        await position.update({ IsActive: true });
        res.status(200).json({ message: "Position enabled successfully.", position });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};