const { 
    Op 
} = require("sequelize");
const { 
    EducationalAttainment 
} = require('../models');

exports.GetAllEducationalAttainments = async (req, res) => {

    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {

        const { count, rows } = await EducationalAttainment.findAndCountAll({
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

exports.GetEducationalAttainment = async (req, res) => {

    try {

        const ea = await EducationalAttainment.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });

        res.json(ea);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.CreateEducationalAttainment = async (req, res) => {

    const { 
        Name
    } = req.body;

    try {

        const eaExist = await EducationalAttainment.findOne({
            where: { 
                Name
            }
        });

        if (eaExist) {
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

        const ea = await EducationalAttainment.create({
            Name
        });

        res.status(201).json({ 
            message: "record created.", 
            ea 
        });

    } catch (error) {

        res.status(400).json({ 
            error: error.message 
        });

    }
};

exports.UpdateEducationalAttainment = async (req, res) => {

    const {
        Id
    } = req.params;

    const { 
        Name
    } = req.body;
  
    try {

        const ea = await EducationalAttainment.findByPk(Id);

        if (!ea) {
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

        const eaExist = await EducationalAttainment.findOne({
            where: {
                Name,
                Id: { [Op.ne]: Id }
            },
        });

        if (eaExist) {
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

        await ea.update({
            Name
        });

        res.status(200).json({ 
            message: "record modified.", 
            ea 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.DisableEducationalAttainment = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {

        const ea = await EducationalAttainment.findByPk(Id);
        
        if (!ea) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record not found",
                    path: "name",
                    location: "body",
                }],
            });
        }

        await ea.update({ 
            IsActive: false 
        });

        res.status(200).json({ 
            message: "record disabled.", 
            ea 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.EnableEducationalAttainment = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {

        const ea = await EducationalAttainment.findByPk(Id);

        if (!ea) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record not found",
                    path: "name",
                    location: "body",
                }],
            });
        }

        await ea.update({ 
            IsActive: true 
        });

        res.status(200).json({ 
            message: "record enabled.", 
            ea 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });
        
    }
};