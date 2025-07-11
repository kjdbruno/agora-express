const { Op } = require("sequelize");
const { Business, Resident, BusinessNature, BusinessType } = require('../models');

exports.getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.findAll(
            {
                include: [
                    {
                        model: BusinessNature,
                        as: 'businessNature',
                        attributes: ['Name']
                    },
                    {
                        model: BusinessType,
                        as: 'businessType',
                        attributes: ['Name']
                    },
                    {
                        model: Resident,
                        as: 'resident',
                        attributes: ['Firstname', 'Middlename', 'Lastname', 'Suffix']
                    }
                ]
            }
        );
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBusiness = async (req, res) => {
    try {
        const businesses = await Business.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createBusiness = async (req, res) => {
    const { 
        Name, 
        ZoneId, 
        BusinessNatureId, 
        BusinessTypeId, 
        ResidentId, 
        Capitalization, 
        Gross
    } = req.body;
    try {
        const bExist = await Business.findOne({
            where: { 
                [Op.or]: [{ Name }] 
            }
        });
        if (bExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Business already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const business = await Business.create({ Name, ZoneId, BusinessNatureId, BusinessTypeId, ResidentId, Capitalization, Gross });
        res.status(201).json({ message: "Business created successfully.", business });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateBusiness = async (req, res) => {

    const { id } = req.params;
    const { 
        Name, 
        ZoneId, 
        BusinessNatureId, 
        BusinessTypeId, 
        ResidentId, 
        Capitalization, 
        Gross
    } = req.body;
  
    try {
        const business = await Business.findByPk(id);
        if (!business) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Business not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const bExist = await Business.findOne({
            where: {
                [Op.or]: [{ Name } ],
                Id: { [Op.ne]: id }
            },
        });
        if (bExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Business is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await business.update({ Name, ZoneId, BusinessNatureId, BusinessTypeId, ResidentId, Capitalization, Gross });
        res.status(200).json({ message: "Business updated successfully.", business });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableBusiness = async (req, res) => {

    const { id } = req.params;
  
    try {
        const business = await Business.findByPk(id);
        if (!business) {
            return res.status(404).json({ error: "Business not found." });
        }
        await business.update({ IsActive: false });
        res.status(200).json({ message: "Business disabled successfully.", business });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableBusiness = async (req, res) => {

    const { id } = req.params;
  
    try {
        const business = await Business.findByPk(id);
        if (!business) {
            return res.status(404).json({ error: "Business not found." });
        }
        await business.update({ IsActive: true });
        res.status(200).json({ message: "Business enabled successfully.", business });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};