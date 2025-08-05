const { 
    Op 
} = require("sequelize");
const { 
    BusinessNature 
} = require('../models');

exports.GetAllBusinessNatures = async (req, res) => {

    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {

        const { count, rows } = await BusinessNature.findAll({
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

exports.GetBusinessNature = async (req, res) => {

    try {

        const bn = await BusinessNature.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });

        res.json(bn);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.CreateBusinessNature = async (req, res) => {

    const {
        Name
    } = req.body;

    try {
        const bnExist = await BusinessNature.findOne({
            where: { 
                Name
            }
        });

        if (bnExist) {
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

        const bn = await BusinessNature.create({
            Name
        });

        res.status(201).json({ 
            message: "record created.", 
            bn 
        });

    } catch (error) {

        res.status(400).json({ 
            error: error.message 
        });

    }
};

exports.UpdateBusinessNature = async (req, res) => {

    const {
        Id
    } = req.params;
    const {
        Name
    } = req.body;
  
    try {

        const bn = await BusinessNature.findByPk(Id);

        if (!bn) {
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

        const bnExist = await BusinessNature.findOne({
            where: {
                Name,
                Id: { [Op.ne]: Id }
            },
        });

        if (bnExist) {
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

        await bn.update({
            Name
        });

        res.status(200).json({ 
            message: "record modified.", 
            bn 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.DisableBusinessNature = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {

        const bn = await BusinessNature.findByPk(Id);

        if (!bn) {
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

        await bn.update({ 
            IsActive: false 
        });

        res.status(200).json({ 
            message: "record disabled.", 
            bn 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.EnableBusinessNature = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {

        const bn = await BusinessNature.findByPk(Id);

        if (!bn) {
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

        await bn.update({ 
            IsActive: true 
        });

        res.status(200).json({ 
            message: "record enabled.", 
            bn 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });
        
    }
};