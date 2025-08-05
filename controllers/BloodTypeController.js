const { 
    Op 
} = require("sequelize");
const { 
    BloodType 
} = require('../models');

exports.GetAllBloodTypes = async (req, res) => {

    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {

        const { count, rows } = await BloodType.findAndCountAll({
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

exports.GetBloodType = async (req, res) => {

    try {

        const types = await BloodType.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });

        res.json(types);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.CreateBloodType = async (req, res) => {

    const {
        Name
    } = req.body;

    try {

        const typeExist = await BloodType.findOne({
            where: { 
                Name
            }
        });

        if (typeExist) {
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

        const type = await BloodType.create({ 
            Name 
        });

        res.status(201).json({ 
            message: "record created.", 
            type 
        });

    } catch (error) {

        res.status(400).json({ 
            error: error.message 
        });

    }
};

exports.UpdateBloodType = async (req, res) => {

    const {
        Id
    } = req.params;

    const {
        Name
    } = req.body;
  
    try {

        const type = await BloodType.findByPk(Id);

        if (!type) {
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

        const typeExist = await BloodType.findOne({
            where: {
                Name,
                Id: { [Op.ne]: Id }
            },
        });

        if (typeExist) {
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

        await type.update({ 
            Name 
        });

        res.status(200).json({ 
            message: "record modified.", 
            type 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.DisableBloodType = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {

        const type = await BloodType.findByPk(Id);

        if (!type) {
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

        await type.update({ 
            IsActive: false 
        });

        res.status(200).json({ 
            message: "record disabled.", 
            type 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.EnableBloodType = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {

        const type = await BloodType.findByPk(Id);

        if (!type) {
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

        await type.update({ 
            IsActive: true 
        });

        res.status(200).json({ 
            message: "record enabled.", 
            type 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });
        
    }
};