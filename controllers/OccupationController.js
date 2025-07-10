const { Op } = require("sequelize");
const { Occupation } = require('../models');

exports.getAllOccupations = async (req, res) => {
    try {
        const occupations = await Occupation.findAll();
        res.json(occupations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOccupation = async (req, res) => {
    try {
        const occupations = await Occupation.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(occupations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createOccupation = async (req, res) => {
    const { name } = req.body;
    try {
        const occupationExist = await Occupation.findOne({
            where: { 
                [Op.or]: [{ Name: name }] 
            }
        });
        if (occupationExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Occupation already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const occupation = await Occupation.create({ Name: name });
        res.status(201).json({ message: "Occupation created successfully.", occupation });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateOccupation = async (req, res) => {

    const { id } = req.params;
    const { name } = req.body;
  
    try {
        const occupation = await Occupation.findByPk(id);
        if (!occupation) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Occupation not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const occupationExist = await Occupation.findOne({
            where: {
                [Op.or]: [{ Name: name } ],
                Id: { [Op.ne]: id }
            },
        });
        if (occupationExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Occupation is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await occupation.update({ Name: name });
        res.status(200).json({ message: "Occupation updated successfully.", occupation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableOccupation = async (req, res) => {

    const { id } = req.params;
    const isActive = false;
  
    try {
        const occupation = await Occupation.findByPk(id);
        if (!occupation) {
            return res.status(404).json({ error: "Occupation not found." });
        }
        await occupation.update({ IsActive: isActive });
        res.status(200).json({ message: "Occupation disabled successfully.", occupation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableOccupation = async (req, res) => {

    const { id } = req.params;
    const isActive = true;
  
    try {
        const occupation = await Occupation.findByPk(id);
        if (!occupation) {
            return res.status(404).json({ error: "Occupation not found." });
        }
        await occupation.update({ IsActive: isActive });
        res.status(200).json({ message: "Occupation enabled successfully.", occupation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};