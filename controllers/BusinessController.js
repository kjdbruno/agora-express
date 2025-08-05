const { Op } = require("sequelize");
const { Business, Resident, BusinessNature, BusinessType } = require('../models');

exports.GetAllBusinesses = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await Business.findAndCountAll({
            Limit,
            Offset,
            order: [['Id', 'ASC']],
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

exports.GetBusiness = async (req, res) => {
    try {
        const businesses = await Business.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.CreateBusiness = async (req, res) => {

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
                Name
            }
        });
        if (bExist) {
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
        const business = await Business.create({ 
            Name, 
            ZoneId, 
            BusinessNatureId, 
            BusinessTypeId, 
            ResidentId, 
            Capitalization, 
            Gross 
        });
        res.status(201).json({ 
            message: "record created.", 
            business 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.UpdateBusiness = async (req, res) => {

    const {
        Id
    } = req.params;
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
        const business = await Business.findByPk(Id);
        if (!business) {
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
        const bExist = await Business.findOne({
            where: {
                Name,
                Id: { [Op.ne]: Id }
            },
        });
        if (bExist) {
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
        await business.update({ 
            Name, 
            ZoneId, 
            BusinessNatureId, 
            BusinessTypeId, 
            ResidentId, 
            Capitalization, 
            Gross 
        });
        res.status(200).json({ 
            message: "record modified.", 
            business 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.DisableBusiness = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const business = await Business.findByPk(Id);
        if (!business) {
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
        await business.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "record disabled.", 
            business 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnableBusiness = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const business = await Business.findByPk(Id);
        if (!business) {
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
        await business.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "record enabled.", 
            business 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};