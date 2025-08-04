const { Op } = require("sequelize");
const { Illness } = require('../models');

exports.GetAllIllnesses = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await Illness.findAndCountAll({
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

exports.GetIllness = async (req, res) => {
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

exports.CreateIllness = async (req, res) => {
    const { 
        Name
    } = req.body;
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
                    msg: "record already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const illness = await Illness.create({ 
            Name 
        });
        res.status(201).json({
            message: "record created.", 
            illness 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message
        });
    }
};

exports.UpdateIllness = async (req, res) => {

    const { 
        Id
    } = req.params;
    const { 
        Name
    } = req.body;
  
    try {
        const illness = await Illness.findByPk(id);
        if (!illness) {
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
        const illnessExist = await Illness.findOne({
            where: {
                Name,
                Id: { [Op.ne]: Id }
            },
        });
        if (illnessExist) {
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
        await illness.update({ 
            Name
         });
        res.status(200).json({ 
            message: "record modified.", 
            illness 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.DisableIllness = async (req, res) => {

    const { 
        Id
    } = req.params;
  
    try {
        const illness = await Illness.findByPk(Id);
        if (!illness) {
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
        await illness.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "record disabled.", 
            illness 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnableIllness = async (req, res) => {

    const { 
        Id
    } = req.params;
  
    try {
        const illness = await Illness.findByPk(Id);
        if (!illness) {
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
        await illness.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "record enabled.", 
            illness 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};