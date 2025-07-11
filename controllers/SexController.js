const { Op } = require("sequelize");
const { Sex } = require('../models');

exports.getAllSexes = async (req, res) => {
    try {
        const sexes = await Sex.findAll();
        res.json(sexes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSex = async (req, res) => {
    try {
        const sexes = await Sex.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(sexes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createSex = async (req, res) => {
    const { name } = req.body;
    try {
        const sexExist = await Sex.findOne({
            where: { 
                [Op.or]: [{ Name: name }] 
            }
        });
        if (sexExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Sex already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const sex = await Sex.create({ Name: name });
        res.status(201).json({ message: "Sex created successfully.", sex });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateSex = async (req, res) => {

    const { id } = req.params;
    const { name } = req.body;
  
    try {
        const sex = await Sex.findByPk(id);
        if (!sex) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Sex not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const sexExist = await Sex.findOne({
            where: {
                [Op.or]: [{ Name: name } ],
                Id: { [Op.ne]: id }
            },
        });
        if (sexExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Sex is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await sex.update({ Name: name });
        res.status(200).json({ message: "Sex updated successfully.", sex });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableSex = async (req, res) => {

    const { id } = req.params;
  
    try {
        const sex = await Sex.findByPk(id);
        if (!sex) {
            return res.status(404).json({ error: "Sex not found." });
        }
        await sex.update({ IsActive: false });
        res.status(200).json({ message: "Sex disabled successfully.", sex });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableSex = async (req, res) => {

    const { id } = req.params;
  
    try {
        const sex = await Sex.findByPk(id);
        if (!sex) {
            return res.status(404).json({ error: "Sex not found." });
        }
        await sex.update({ IsActive: true });
        res.status(200).json({ message: "Sex enabled successfully.", sex });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};