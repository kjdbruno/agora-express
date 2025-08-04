const { Op } = require("sequelize");
const { Position } = require('../models');

exports.GetAllPositions = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await Position.findAndCountAll({
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

exports.GetPosition = async (req, res) => {
    try {
        const positions = await Position.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(positions);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.CreatePosition = async (req, res) => {
    const {
        Name
    } = req.body;
    try {
        const positionExist = await Position.findOne({
            where: { 
                Name
            }
        });
        if (positionExist) {
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
        const position = await Position.create({
            Name
        });
        res.status(201).json({ 
            message: "record created.", 
            position 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.UpdatePosition = async (req, res) => {

    const {
        Id
    } = req.params;
    const {
        Name
    } = req.body;
  
    try {
        const position = await Position.findByPk(Id);
        if (!position) {
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
        const positionExist = await Position.findOne({
            where: {
                Name,
                Id: { [Op.ne]: Id }
            },
        });
        if (positionExist) {
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
        await position.update({
            Name
        });
        res.status(200).json({ 
            message: "record modified.", 
            position 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.DisablePosition = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const position = await Position.findByPk(Id);
        if (!position) {
            return res.status(404).json({ 
                error: "record not found." 
            });
        }
        await position.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "record disabled.", 
            position 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnablePosition = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const position = await Position.findByPk(Id);
        if (!position) {
            return res.status(404).json({ 
                error: "record not found." 
            });
        }
        await position.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "record enabled.", 
            position 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};