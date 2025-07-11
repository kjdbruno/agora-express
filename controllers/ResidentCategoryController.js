const { Op } = require("sequelize");
const { ResidentCategory } = require('../models');

exports.getAllResidentCategories = async (req, res) => {
    try {
        const rc = await ResidentCategory.findAll();
        res.json(rc);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getResidentcategory = async (req, res) => {
    try {
        const rc = await ResidentCategory.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name', 'Alias']
        });
        res.json(rc);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createResidentCategory = async (req, res) => {
    const { name, alias } = req.body;
    try {
        const rcExist = await ResidentCategory.findOne({
            where: { 
                [Op.or]: [{ Name: name }, { Alias: alias }] 
            }
        });
        if (rcExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Resident category already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const rc = await ResidentCategory.create({ Name: name, Alias: alias });
        res.status(201).json({ message: "Resident category created successfully.", rc });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateResidentCategory = async (req, res) => {

    const { id } = req.params;
    const { name, alias } = req.body;
  
    try {
        const rc = await ResidentCategory.findByPk(id);
        if (!rc) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Resident category not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const rcExist = await ResidentCategory.findOne({
            where: {
                [Op.or]: [{ Name: name }, { Alias: alias } ],
                Id: { [Op.ne]: id }
            },
        });
        if (rcExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Resident category is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await rc.update({ Name: name, Alias: alias });
        res.status(200).json({ message: "Resident category updated successfully.", rc });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableResidentCategory = async (req, res) => {

    const { id } = req.params;
  
    try {
        const rc = await ResidentCategory.findByPk(id);
        if (!rc) {
            return res.status(404).json({ error: "Resident category not found." });
        }
        await rc.update({ IsActive: false });
        res.status(200).json({ message: "Resident category disabled successfully.", rc });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableResidentCategory = async (req, res) => {

    const { id } = req.params;
  
    try {
        const rc = await ResidentCategory.findByPk(id);
        if (!rc) {
            return res.status(404).json({ error: "Resident category not found." });
        }
        await rc.update({ IsActive: true });
        res.status(200).json({ message: "Resident category enabled successfully.", rc });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};