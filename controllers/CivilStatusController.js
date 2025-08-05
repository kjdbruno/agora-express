const { Op } = require("sequelize");
const { CivilStatus } = require('../models');

exports.GetAllCivilStatuses = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await CivilStatus.findAndCountAll({
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
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.GetCivilStatus = async (req, res) => {
    try {
        const statuses = await CivilStatus.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(statuses);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.CreateCivilStatus = async (req, res) => {

    const { 
        Name
    } = req.body;

    try {
        const statusExist = await CivilStatus.findOne({
            where: { 
                Name
            }
        });
        if (statusExist) {
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
        const status = await CivilStatus.create({
            Name
        });
        res.status(201).json({ 
            message: "record created.", 
            status 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.UpdateCivilStatus = async (req, res) => {

    const {
        Id
    } = req.params;
    const {
        Name
    } = req.body;
  
    try {
        const status = await CivilStatus.findByPk(Id);
        if (!status) {
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
        const statusExist = await CivilStatus.findOne({
            where: {
                Name,
                Id: { [Op.ne]: Id }
            },
        });
        if (statusExist) {
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
        await status.update({
            Name
        });
        res.status(200).json({ 
            message: "record modified.", 
            status 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.DisableCivilStatus = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const status = await CivilStatus.findByPk(Id);
        if (!status) {
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
        await status.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "record disabled.", 
            status 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnableCivilStatus = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const status = await CivilStatus.findByPk(Id);
        if (!status) {
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
        await status.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "record enabled.", 
            status 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};