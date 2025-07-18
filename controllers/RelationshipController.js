const { Op } = require("sequelize");
const { Relationship } = require('../models');

exports.getAllRelationships = async (req, res) => {
    try {
        const relationships = await Relationship.findAll();
        res.json(relationships);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRelationship = async (req, res) => {
    try {
        const relationship = await Relationship.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(relationship);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createRelationship = async (req, res) => {
    const { Name } = req.body;
    try {
        const rExist = await Relationship.findOne({
            where: { 
                [Op.or]: [{ Name }] 
            }
        });
        if (rExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Relationship already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const relationship = await Relationship.create({ Name });
        res.status(201).json({ message: "Relationship created successfully.", relationship });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateRelationship = async (req, res) => {

    const { id } = req.params;
    const { Name } = req.body;
  
    try {
        const relationship = await Relationship.findByPk(id);
        if (!relationship) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Relationship not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const rExist = await Relationship.findOne({
            where: {
                [Op.or]: [{ Name } ],
                Id: { [Op.ne]: id }
            },
        });
        if (rExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Relationship is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await relationship.update({ Name });
        res.status(200).json({ message: "Relationship updated successfully.", relationship });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableRelationship = async (req, res) => {

    const { id } = req.params;
  
    try {
        const relationship = await Relationship.findByPk(id);
        if (!relationship) {
            return res.status(404).json({ error: "Relationship not found." });
        }
        await relationship.update({ IsActive: false });
        res.status(200).json({ message: "Relationship disabled successfully.", relationship });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableRelationship = async (req, res) => {

    const { id } = req.params;
  
    try {
        const relationship = await Relationship.findByPk(id);
        if (!relationship) {
            return res.status(404).json({ error: "Relationship not found." });
        }
        await relationship.update({ IsActive: true });
        res.status(200).json({ message: "Relationship enabled successfully.", relationship });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};