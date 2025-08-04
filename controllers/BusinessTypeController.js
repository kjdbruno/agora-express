const { Op } = require("sequelize");
const { BusinessType, Business } = require('../models');

exports.getAllBusinessTypes = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await BusinessType.findAndCountAll({
            Limit,
            Offset,
            order: [['Id', 'ASC']],
        });
        res.json({
            Data: rows,
            Meta: {
                TotalItems: count,
                TotalPages: Math.ceil(count / Limit),
                CurrentPage: Page
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBusinessType = async (req, res) => {
    try {
        const bt = await BusinessType.findAll({
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

exports.createBusinessType = async (req, res) => {
    const { Name } = req.body;
    try {
        const btExist = await BusinessType.findOne({
            where: { 
                [Op.or]: [{ Name }] 
            }
        });
        if (btExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Business type already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const bt = await BusinessType.create({ Name });
        res.status(201).json({ message: "Business type created successfully.", bt });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateBusinessType = async (req, res) => {

    const { id } = req.params;
    const { Name } = req.body;
  
    try {
        const bt = await BusinessType.findByPk(id);
        if (!bt) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Business type not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const btExist = await BusinessType.findOne({
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
                    msg: "Business type is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await bt.update({ Name });
        res.status(200).json({ message: "Business type updated successfully.", bt });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableBusinessType = async (req, res) => {

    const { id } = req.params;
  
    try {
        const bt = await BusinessType.findByPk(id);
        if (!bt) {
            return res.status(404).json({ error: "Business Type not found." });
        }
        await bt.update({ IsActive: false });
        res.status(200).json({ message: "Business Type disabled successfully.", bt });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableBusinessType = async (req, res) => {

    const { id } = req.params;
  
    try {
        const bt = await BusinessType.findByPk(id);
        if (!bt) {
            return res.status(404).json({ error: "Business Type not found." });
        }
        await bt.update({ IsActive: true });
        res.status(200).json({ message: "Business Type enabled successfully.", bt });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};