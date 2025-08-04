const { Op } = require("sequelize");
const { Disease } = require('../models');

exports.getAllDiseases = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await Disease.findAndCountAll({
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

exports.getDisease = async (req, res) => {
    try {
        const diseases = await Disease.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(diseases);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.createDisease = async (req, res) => {
    const { Name } = req.body;
    try {
        const diseaseExist = await Disease.findOne({
            where: { 
                Name
            }
        });
        if (diseaseExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Disease already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const disease = await Disease.create({ 
            Name 
        });
        res.status(201).json({
            message: "Disease created successfully.", 
            disease 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message
        });
    }
};

exports.updateDisease = async (req, res) => {

    const { id } = req.params;
    const { Name } = req.body;
  
    try {
        const disease = await Disease.findByPk(id);
        if (!disease) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Disease not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const diseaseExist = await Disease.findOne({
            where: {
                Name,
                Id: { [Op.ne]: id }
            },
        });
        if (diseaseExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Disease is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await disease.update({ 
            Name
         });
        res.status(200).json({ 
            message: "Disease updated successfully.", 
            disease 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.disableDisease = async (req, res) => {

    const { id } = req.params;
  
    try {
        const disease = await Disease.findByPk(id);
        if (!disease) {
           return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Disease not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await disease.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "Disease disabled successfully.", 
            disease 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.enableDisease = async (req, res) => {

    const { id } = req.params;
  
    try {
        const disease = await Disease.findByPk(id);
        if (!disease) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Disease not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await disease.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "Disease enabled successfully.", 
            disease 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};