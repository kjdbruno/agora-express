const { Op } = require("sequelize");
const { BusinessNature } = require('../models');

exports.getAllBusinessNatures = async (req, res) => {
    try {
        const bn = await BusinessNature.findAll();
        res.json(bn);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBusinessNature = async (req, res) => {
    try {
        const bn = await BusinessNature.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(bn);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createBusinessNature = async (req, res) => {
    const { Name } = req.body;
    try {
        const bnExist = await BusinessNature.findOne({
            where: { 
                [Op.or]: [{ Name }] 
            }
        });
        if (bnExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Business nature already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const bn = await BusinessNature.create({ Name });
        res.status(201).json({ message: "Business Nature created successfully.", bn });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateBusinessNature = async (req, res) => {

    const { id } = req.params;
    const { Name } = req.body;
  
    try {
        const bn = await BusinessNature.findByPk(id);
        if (!bn) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Business Nature not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const bnExist = await BusinessNature.findOne({
            where: {
                [Op.or]: [{ Name } ],
                Id: { [Op.ne]: id }
            },
        });
        if (bnExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Business Nature is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await bn.update({ Name });
        res.status(200).json({ message: "Business nature updated successfully.", bn });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableBusinessNature = async (req, res) => {

    const { id } = req.params;
  
    try {
        const bn = await BusinessNature.findByPk(id);
        if (!bn) {
            return res.status(404).json({ error: "Business Nature not found." });
        }
        await bn.update({ IsActive: false });
        res.status(200).json({ message: "Business Nature disabled successfully.", bn });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableBusinessNature = async (req, res) => {

    const { id } = req.params;
  
    try {
        const bn = await BusinessNature.findByPk(id);
        if (!bn) {
            return res.status(404).json({ error: "Business Nature not found." });
        }
        await bn.update({ IsActive: true });
        res.status(200).json({ message: "Business Nature enabled successfully.", bn });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};