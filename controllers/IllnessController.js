const { Op } = require("sequelize");
const { Illness } = require('../models');

exports.getAllIllnesses = async (req, res) => {
    try {
        const illnesses = await Illness.findAll();
        res.json(illnesses);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.getIllness = async (req, res) => {
    try {
        const illnesses = await Illness.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(illnesses);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.createIllness = async (req, res) => {
    const { Name } = req.body;
    try {
        const illnessExist = await Illness.findOne({
            where: { 
                Name
            }
        });
        if (illnessExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Illness already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const illness = await Illness.create({ 
            Name 
        });
        res.status(201).json({
            message: "Illness created successfully.", 
            illness 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message
        });
    }
};

exports.updateIllness = async (req, res) => {

    const { id } = req.params;
    const { Name } = req.body;
  
    try {
        const illness = await Illness.findByPk(id);
        if (!illness) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Illness not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const illnessExist = await Illness.findOne({
            where: {
                Name,
                Id: { [Op.ne]: id }
            },
        });
        if (illnessExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Illness is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await illness.update({ 
            Name
         });
        res.status(200).json({ 
            message: "Illness updated successfully.", 
            illness 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.disableIllness = async (req, res) => {

    const { id } = req.params;
  
    try {
        const illness = await Illness.findByPk(id);
        if (!illness) {
           return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Illness not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await illness.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "Illness disabled successfully.", 
            illness 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.enableIllness = async (req, res) => {

    const { id } = req.params;
  
    try {
        const illness = await Illness.findByPk(id);
        if (!illness) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Illness not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await illness.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "Illness enabled successfully.", 
            illness 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};