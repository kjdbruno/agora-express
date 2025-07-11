const { Op } = require("sequelize");
const { Religion } = require('../models');

exports.getAllReligions = async (req, res) => {
    try {
        const religions = await Religion.findAll();
        res.json(religions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReligion = async (req, res) => {
    try {
        const religions = await Religion.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(religions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createReligion = async (req, res) => {
    const { name } = req.body;
    try {
        const religionExist = await Religion.findOne({
            where: { 
                [Op.or]: [{ Name: name }] 
            }
        });
        if (religionExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Religion already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const religion = await Religion.create({ Name: name });
        res.status(201).json({ message: "Religion created successfully.", religion });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateReligion = async (req, res) => {

    const { id } = req.params;
    const { name } = req.body;
  
    try {
        const religion = await Religion.findByPk(id);
        if (!religion) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Religion not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const religionExist = await Religion.findOne({
            where: {
                [Op.or]: [{ Name: name } ],
                Id: { [Op.ne]: id }
            },
        });
        if (religionExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Religion is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await religion.update({ Name: name });
        res.status(200).json({ message: "Religion updated successfully.", religion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableReligion = async (req, res) => {

    const { id } = req.params;
  
    try {
        const religion = await Religion.findByPk(id);
        if (!religion) {
            return res.status(404).json({ error: "Religion not found." });
        }
        await religion.update({ IsActive: false });
        res.status(200).json({ message: "Religion disabled successfully.", religion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableReligion = async (req, res) => {

    const { id } = req.params;
  
    try {
        const religion = await Religion.findByPk(id);
        if (!religion) {
            return res.status(404).json({ error: "Religion not found." });
        }
        await religion.update({ IsActive: true });
        res.status(200).json({ message: "Religion enabled successfully.", religion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};