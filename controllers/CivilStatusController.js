const { Op } = require("sequelize");
const { CivilStatus } = require('../models');

exports.getAllCivilStatuses = async (req, res) => {
    try {
        const statuses = await CivilStatus.findAll();
        res.json(statuses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCivilStatus = async (req, res) => {
    try {
        const statuses = await CivilStatus.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(statuses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCivilStatus = async (req, res) => {
    const { name } = req.body;
    try {
        const statusExist = await CivilStatus.findOne({
            where: { 
                [Op.or]: [{ Name: name }] 
            }
        });
        if (statusExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Civil Status already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const status = await CivilStatus.create({ Name: name });
        res.status(201).json({ message: "Civil Status created successfully.", status });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateCivilStatus = async (req, res) => {

    const { id } = req.params;
    const { name } = req.body;
  
    try {
        const status = await CivilStatus.findByPk(id);
        if (!status) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Civil Status not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const statusExist = await CivilStatus.findOne({
            where: {
                [Op.or]: [{ Name: name } ],
                Id: { [Op.ne]: id }
            },
        });
        if (statusExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Civil Status is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await status.update({ Name: name });
        res.status(200).json({ message: "Civil Status updated successfully.", status });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableCivilStatus = async (req, res) => {

    const { id } = req.params;
    const isActive = false;
  
    try {
        const status = await CivilStatus.findByPk(id);
        if (!status) {
            return res.status(404).json({ error: "Civil Status not found." });
        }
        await status.update({ IsActive: isActive });
        res.status(200).json({ message: "Civil Status disabled successfully.", status });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableCivilStatus = async (req, res) => {

    const { id } = req.params;
    const isActive = true;
  
    try {
        const status = await CivilStatus.findByPk(id);
        if (!status) {
            return res.status(404).json({ error: "Civil Status not found." });
        }
        await status.update({ IsActive: isActive });
        res.status(200).json({ message: "Civil Status enabled successfully.", status });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};