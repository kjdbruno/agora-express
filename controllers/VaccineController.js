const { Op } = require("sequelize");
const { Vaccine } = require('../models');

exports.getAllVaccines = async (req, res) => {
    try {
        const vaccines = await Vaccine.findAll();
        res.json(vaccines);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.getVaccine = async (req, res) => {
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

exports.createVaccine = async (req, res) => {
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
                    msg: "Vaccine already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const vaccine = await Vaccine.create({ 
            Name 
        });
        res.status(201).json({
            message: "Vaccine created successfully.", 
            vaccine 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message
        });
    }
};

exports.updateVaccine = async (req, res) => {

    const { id } = req.params;
    const { Name } = req.body;
  
    try {
        const vaccine = await Vaccine.findByPk(id);
        if (!vaccine) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Vaccine not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const vExist = await Vaccine.findOne({
            where: {
                Name,
                Id: { [Op.ne]: id }
            },
        });
        if (vExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Vaccine is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await vaccine.update({ 
            Name
         });
        res.status(200).json({ 
            message: "Vaccine updated successfully.", 
            vaccine 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.disableVaccine = async (req, res) => {

    const { id } = req.params;
  
    try {
        const vaccine = await Vaccine.findByPk(id);
        if (!vaccine) {
           return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Vaccine not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await vaccine.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "Vaccine disabled successfully.", 
            vaccine 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.enableVaccine = async (req, res) => {

    const { id } = req.params;
  
    try {
        const vaccine = await Vaccine.findByPk(id);
        if (!vaccine) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Vaccine not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await vaccine.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "Vaccine enabled successfully.", 
            vaccine 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};