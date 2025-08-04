const { Op } = require("sequelize");
const { Occupation } = require('../models');

exports.GetAllOccupations = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await Occupation.findAndCountAll({
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

exports.GetOccupation = async (req, res) => {
    try {
        const occupations = await Occupation.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(occupations);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.CreateOccupation = async (req, res) => {
    const {
        Name
    } = req.body;
    try {
        const occupationExist = await Occupation.findOne({
            where: { 
                Name
            }
        });
        if (occupationExist) {
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
        const occupation = await Occupation.create({
            Name
        });
        res.status(201).json({ 
            message: "record created.", 
            occupation 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.UpdateOccupation = async (req, res) => {

    const {
        Id
    } = req.params;
    const {
        Name
    } = req.body;
  
    try {
        const occupation = await Occupation.findByPk(Id);
        if (!occupation) {
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
        const occupationExist = await Occupation.findOne({
            where: {
                Name,
                Id: { [Op.ne]: Id }
            },
        });
        if (occupationExist) {
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
        await occupation.update({ 
            Name
        });
        res.status(200).json({ 
            message: "record modified.", 
            occupation 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.DisableOccupation = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const occupation = await Occupation.findByPk(Id);
        if (!occupation) {
            return res.status(404).json({ 
                error: "record not found." 
            });
        }
        await occupation.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "record disbaled.", 
            occupation 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnableOccupation = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const occupation = await Occupation.findByPk(Id);
        if (!occupation) {
            return res.status(404).json({ 
                error: "record not found." 
            });
        }
        await occupation.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "record enabled.", 
            occupation 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};