const { 
    Op 
} = require("sequelize");
const { 
    BusinessType, 
} = require('../models');

exports.GetAllBusinessTypes = async (req, res) => {

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

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.GetBusinessType = async (req, res) => {

    try {

        const bt = await BusinessType.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });

        res.json(bt);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.CreateBusinessType = async (req, res) => {

    const { 
        Name 
    } = req.body;

    try {

        const btExist = await BusinessType.findOne({
            where: { 
                Name
            }
        });

        if (btExist) {
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

        const bt = await BusinessType.create({ 
            Name 
        });

        res.status(201).json({ 
            message: "record created.", 
            bt 
        });

    } catch (error) {

        res.status(400).json({ 
            error: error.message 
        });

    }
};

exports.UpdateBusinessType = async (req, res) => {

    const {
        Id
    } = req.params;

    const {
        Name
    } = req.body;
  
    try {

        const bt = await BusinessType.findByPk(Id);

        if (!bt) {
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

        const btExist = await BusinessType.findOne({
            where: {
                Name,
                Id: { [Op.ne]: Id }
            },
        });

        if (btExist) {
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

        await bt.update({
            Name
        });

        res.status(200).json({ 
            message: "record modified.", 
            bt 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.DisableBusinessType = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {

        const bt = await BusinessType.findByPk(Id);

        if (!bt) {
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

        await bt.update({ 
            IsActive: false 
        });

        res.status(200).json({ 
            message: "record disabled.", 
            bt 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.EnableBusinessType = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {

        const bt = await BusinessType.findByPk(Id);

        if (!bt) {
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

        await bt.update({ 
            IsActive: true 
        });

        res.status(200).json({ 
            message: "record enabled.", 
            bt 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });
        
    }
};