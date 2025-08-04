const { Op } = require("sequelize");
const { Vaccine } = require('../models');

exports.GetAllVaccines = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await Vaccine.findAndCountAll({
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

exports.GetVaccine = async (req, res) => {
    try {
        const vaccines = await Vaccine.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(vaccines);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.CreateVaccine = async (req, res) => {
    const { Name } = req.body;
    try {
        const vaccineExist = await Vaccine.findOne({
            where: { 
                Name
            }
        });
        if (vaccineExist) {
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
        const vaccine = await Vaccine.create({ 
            Name 
        });
        res.status(201).json({
            message: "record created.", 
            vaccine 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message
        });
    }
};

exports.UpdateVaccine = async (req, res) => {

    const { 
        Id 
    } = req.params;
    const { 
        Name 
    } = req.body;
  
    try {
        const vaccine = await Vaccine.findByPk(Id);
        if (!vaccine) {
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
        const vExist = await Vaccine.findOne({
            where: {
                Name,
                Id: { [Op.ne]: Id }
            },
        });
        if (vExist) {
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
        await vaccine.update({ 
            Name
         });
        res.status(200).json({ 
            message: "record modified.", 
            vaccine 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.DisableVaccine = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const vaccine = await Vaccine.findByPk(Id);
        if (!vaccine) {
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
        await vaccine.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "record disabled.", 
            vaccine 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnableVaccine = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const vaccine = await Vaccine.findByPk(Id);
        if (!vaccine) {
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
        await vaccine.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "record enabled.", 
            vaccine 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};