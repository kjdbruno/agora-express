const { Op } = require("sequelize");
const { ResidentCategory } = require('../models');

exports.getAllResidentCategories = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await ResidentCategory.findAndCountAll({
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

exports.GetResidentcategory = async (req, res) => {
    try {
        const rc = await ResidentCategory.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name', 'Alias']
        });
        res.json(rc);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.CreateResidentCategory = async (req, res) => {
    const {
        Name,
        Alias
    } = req.body;
    try {
        const rcExist = await ResidentCategory.findOne({
            where: { 
                [Op.or]: [{ Name }, { Alias }] 
            }
        });
        if (rcExist) {
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
        const rc = await ResidentCategory.create({ 
            Name, 
            Alias 
        });
        res.status(201).json({ 
            message: "record created.", 
            rc 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.UpdateResidentCategory = async (req, res) => {

    const {
        Id
    } = req.params;
    const {
        Name,
        Alias
    } = req.body;
  
    try {
        const rc = await ResidentCategory.findByPk(Id);
        if (!rc) {
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
        const rcExist = await ResidentCategory.findOne({
            where: {
                [Op.or]: [{ Name }, { Alias } ],
                Id: { [Op.ne]: Id }
            },
        });
        if (rcExist) {
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
        await rc.update({ 
            Name, 
            Alias
        });
        res.status(200).json({ 
            message: "record modified.", 
            rc 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.DisableResidentCategory = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const rc = await ResidentCategory.findByPk(Id);
        if (!rc) {
            return res.status(404).json({ 
                error: "record not found." 
            });
        }
        await rc.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "record disabled.", 
            rc 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnableResidentCategory = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const rc = await ResidentCategory.findByPk(id);
        if (!rc) {
            return res.status(404).json({ 
                error: "record not found." 
            });
        }
        await rc.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "record eanbled.", 
            rc 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};