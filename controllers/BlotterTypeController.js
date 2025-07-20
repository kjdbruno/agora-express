const { Op } = require("sequelize");
const { BlotterType } = require('../models');

exports.getAllBlotterTypes = async (req, res) => {
    try {
        const bt = await BlotterType.findAll();
        res.json(bt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBlotterType = async (req, res) => {
    try {
        const bt = await BlotterType.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(bt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createBlotterType = async (req, res) => {
    const { Name } = req.body;
    try {
        const btExist = await BlotterType.findOne({
            where: { 
                [Op.or]: [{ Name }] 
            }
        });
        if (btExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Blotter type already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const bt = await BlotterType.create({ Name });
        res.status(201).json({ message: "Blotter type created successfully.", bt });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateBlotterType = async (req, res) => {

    const { id } = req.params;
    const { Name } = req.body;
  
    try {
        const bt = await BlotterType.findByPk(id);
        if (!bt) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Blotter type not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const btExist = await BlotterType.findOne({
            where: {
                [Op.or]: [{ Name } ],
                Id: { [Op.ne]: id }
            },
        });
        if (btExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Blotter type is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await bt.update({ Name });
        res.status(200).json({ message: "Blotter type updated successfully.", bt });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableBlotterType = async (req, res) => {

    const { id } = req.params;
  
    try {
        const bt = await BlotterType.findByPk(id);
        if (!bt) {
            return res.status(404).json({ error: "Blotter type not found." });
        }
        await bt.update({ IsActive: false });
        res.status(200).json({ message: "Blotter type disabled successfully.", bt });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableBlotterType = async (req, res) => {

    const { id } = req.params;
  
    try {
        const bt = await BlotterType.findByPk(id);
        if (!bt) {
            return res.status(404).json({ error: "Blotter type not found." });
        }
        await bt.update({ IsActive: true });
        res.status(200).json({ message: "Blotter type enabled successfully.", bt });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};