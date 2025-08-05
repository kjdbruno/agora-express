const { Op } = require("sequelize");
const { DiseaseSymptom, Disease } = require('../models');

exports.GetAllSymptoms = async (req, res) => {
    const {
        Id
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
                DiseaseId: Id
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

exports.GetSymptom = async (req, res) => {
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

exports.CreateSymptom = async (req, res) => {
    const { 
        DiseaseId, 
        Name 
    } = req.body;
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
                    msg: "record already exists!",
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
            message: "record created.", 
            symptom 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message
        });
    }
};

exports.UpdateSymptom = async (req, res) => {

    const { 
        Id
    } = req.params;
    const { 
        DiseaseId, 
        Name 
    } = req.body;
  
    try {
        const symptom = await DiseaseSymptom.findByPk(Id);
        if (!symptom) {
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
        const sExist = await DiseaseSymptom.findOne({
            where: {
                DiseaseId,
                Name,
                Id: { [Op.ne]: Id }
            },
        });
        if (sExist) {
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
        await symptom.update({ 
            DiseaseId,
            Name
         });
        res.status(200).json({ 
            message: "record modified.", 
            symptom 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.DisableSymptom = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const symptom = await DiseaseSymptom.findByPk(Id);
        if (!symptom) {
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
        await symptom.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "record disabled.", 
            symptom 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnableSymptom = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const symptom = await DiseaseSymptom.findByPk(Id);
        if (!symptom) {
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
        await symptom.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "record enabled.", 
            symptom 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};