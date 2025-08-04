const { Op } = require("sequelize");
const { DiseaseSymptom, Disease } = require('../models');

exports.getAllSymptoms = async (req, res) => {
    const {
        id
    } = req.query;
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await DiseaseSymptom.findAndCountAll({
            Limit,
            Offset,
            order: [['Id', 'ASC']],
            where: {
                DiseaseId: id
            },
            include: [
                {
                    model: Disease,
                    as: 'disease'
                }
            ]
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

exports.getSymptom = async (req, res) => {
    try {
        const symptoms = await DiseaseSymptom.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(symptoms);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.createSymptom = async (req, res) => {
    const { DiseaseId, Name } = req.body;
    try {
        const sExist = await DiseaseSymptom.findOne({
            where: {
                DiseaseId, 
                Name
            }
        });
        if (sExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Symptom already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const symptom = await DiseaseSymptom.create({ 
            DiseaseId,
            Name 
        });
        res.status(201).json({
            message: "Symptom created successfully.", 
            symptom 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message
        });
    }
};

exports.updateSymptom = async (req, res) => {

    const { id } = req.params;
    const { DiseaseId, Name } = req.body;
  
    try {
        const symptom = await DiseaseSymptom.findByPk(id);
        if (!symptom) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Symptom not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const sExist = await DiseaseSymptom.findOne({
            where: {
                DiseaseId,
                Name,
                Id: { [Op.ne]: id }
            },
        });
        if (sExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Symptom is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await symptom.update({ 
            DiseaseId,
            Name
         });
        res.status(200).json({ 
            message: "Symptom updated successfully.", 
            symptom 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.disableSymptom = async (req, res) => {

    const { id } = req.params;
  
    try {
        const symptom = await DiseaseSymptom.findByPk(id);
        if (!symptom) {
           return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Symptom not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await symptom.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "Symptom disabled successfully.", 
            symptom 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.enableSymptom = async (req, res) => {

    const { id } = req.params;
  
    try {
        const symptom = await DiseaseSymptom.findByPk(id);
        if (!symptom) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Symptom not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await symptom.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "Symptom enabled successfully.", 
            symptom 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};