const { Op } = require("sequelize");
const { Religion } = require('../models');

exports.GetAllReligions = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await Religion.findAndCountAll({
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

exports.GetReligion = async (req, res) => {
    try {
        const religions = await Religion.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(religions);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.CreateReligion = async (req, res) => {
    const {
        Name
    } = req.body;
    try {
        const religionExist = await Religion.findOne({
            where: { 
                Name
            }
        });
        if (religionExist) {
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
        const religion = await Religion.create({
            Name
        });
        res.status(201).json({ 
            message: "record created.", 
            religion 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.UpdateReligion = async (req, res) => {

    const {
        Id
    } = req.params;
    const {
        Name
    } = req.body;
  
    try {
        const religion = await Religion.findByPk(Id);
        if (!religion) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const religionExist = await Religion.findOne({
            where: {
                Name,
                Id: { [Op.ne]: Id }
            },
        });
        if (religionExist) {
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
        await religion.update({
            Name
        });
        res.status(200).json({ 
            message: "record modified.", 
            religion 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.DisableReligion = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const religion = await Religion.findByPk(Id);
        if (!religion) {
            return res.status(404).json({ 
                error: "record not found." 
            });
        }
        await religion.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "record disabled.", 
            religion 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnableReligion = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const religion = await Religion.findByPk(Id);
        if (!religion) {
            return res.status(404).json({ 
                error: "record not found."
            });
        }
        await religion.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "record enabled.", 
            religion 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};