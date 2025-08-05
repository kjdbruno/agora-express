const { 
    Op 
} = require("sequelize");
const { 
    Medication 
} = require('../models');

exports.GetAllMedications = async (req, res) => {

    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {

        const { count, rows } = await Medication.findAndCountAll({
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

exports.GetMedication = async (req, res) => {

    try {

        const medications = await Medication.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });

        res.json(medications);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.CreateMedication = async (req, res) => {

    const {
        Name
    } = req.body;

    try {

        const mExist = await Medication.findOne({
            where: { 
                Name
            }
        });

        if (mExist) {
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

        const medication = await Medication.create({ 
            Name 
        });

        res.status(201).json({
            message: "record created.", 
            medication 
        });

    } catch (error) {
        res.status(400).json({ 
            error: error.message
        });
    }
};

exports.UpdateMedication = async (req, res) => {

    const { 
        Id
    } = req.params;

    const { 
        Name
    } = req.body;
  
    try {

        const medication = await Medication.findByPk(Id);

        if (!medication) {
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

        const mExist = await Medication.findOne({
            where: {
                Name,
                Id: { [Op.ne]: Id }
            },
        });

        if (mExist) {
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

        await medication.update({ 
            Name
        });

        res.status(200).json({ 
            message: "record modified.", 
            medication 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.DisableMedication = async (req, res) => {

    const { 
        Id
    } = req.params;
  
    try {

        const medication = await Medication.findByPk(Id);

        if (!medication) {
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

        await medication.update({ 
            IsActive: false 
        });

        res.status(200).json({ 
            message: "record disabled.", 
            medication 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.EnableMedication = async (req, res) => {

    const { 
        Id
    } = req.params;
  
    try {

        const medication = await Medication.findByPk(Id);

        if (!medication) {
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

        await medication.update({ 
            IsActive: true 
        });

        res.status(200).json({ 
            message: "record enabled.", 
            medication 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });
        
    }
};