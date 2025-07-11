const { Op } = require("sequelize");
const { Zone } = require('../models');

exports.getAllZones = async (req, res) => {
    try {
        const zones = await Zone.findAll();
        res.json(zones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getZone = async (req, res) => {
    try {
        const zones = await Zone.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(zones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createZone = async (req, res) => {
    const { name } = req.body;
    try {
        const zoneExist = await Zone.findOne({
            where: { 
                [Op.or]: [{ Name: name }] 
            }
        });
        if (zoneExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Zone already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const zone = await Zone.create({ Name: name });
        res.status(201).json({ message: "Zone created successfully.", zone });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateZone = async (req, res) => {

    const { id } = req.params;
    const { name } = req.body;
  
    try {
        const zone = await Zone.findByPk(id);
        if (!zone) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Zone not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const zoneExist = await Zone.findOne({
            where: {
                [Op.or]: [{ Name: name } ],
                Id: { [Op.ne]: id }
            },
        });
        if (zoneExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Zone is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await zone.update({ Name: name });
        res.status(200).json({ message: "Zone updated successfully.", zone });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableZone = async (req, res) => {

    const { id } = req.params;
  
    try {
        const zone = await Zone.findByPk(id);
        if (!zone) {
            return res.status(404).json({ error: "Zone not found." });
        }
        await zone.update({ IsActive: false });
        res.status(200).json({ message: "Zone disabled successfully.", zone });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableZone = async (req, res) => {

    const { id } = req.params;
  
    try {
        const zone = await Zone.findByPk(id);
        if (!zone) {
            return res.status(404).json({ error: "Zone not found." });
        }
        await zone.update({ IsActive: true });
        res.status(200).json({ message: "Zone enabled successfully.", zone });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};