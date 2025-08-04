const { Op } = require("sequelize");
const { Zone } = require('../models');

exports.GetAllZones = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await Zone.findAll({
            Limit,
            Offset,
            order: [['Id', 'ASC']]
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
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.GetZone = async (req, res) => {
    try {
        const zones = await Zone.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(zones);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.CreateZone = async (req, res) => {
    const { Name } = req.body;
    try {
        const zoneExist = await Zone.findOne({
            where: { 
                Name
            }
        });
        if (zoneExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const zone = await Zone.create({
            Name
        });
        res.status(201).json({ 
            message: "record created.", 
            zone 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.UpdateZone = async (req, res) => {

    const {
        Id
    } = req.params;
    const {
        Name
    } = req.body;
  
    try {
        const zone = await Zone.findByPk(Id);
        if (!zone) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "no record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const zoneExist = await Zone.findOne({
            where: {
                Name,
                Id: { [Op.ne]: Id }
            },
        });
        if (zoneExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record already exist!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await zone.update({
            Name
        });
        res.status(200).json({ 
            message: "record modified.", 
            zone 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.DisableZone = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const zone = await Zone.findByPk(Id);
        if (!zone) {
            return res.status(404).json({ 
                error: "no record found." 
            });
        }
        await zone.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "record disabled.", 
            zone 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnableZone = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const zone = await Zone.findByPk(Id);
        if (!zone) {
            return res.status(404).json({ 
                error: "record not found." 
            });
        }
        await zone.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "record enabled.", 
            zone 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};