const { Op } = require("sequelize");
const { AccountChart } = require('../models');

exports.getAllAccountCharts = async (req, res) => {

    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {
        const { count, rows } = await AccountChart.findAndCountAll({
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
        res.status(500).json({ error: error.message });
    }
};

exports.getAccountChart = async (req, res) => {
    try {
        const ac = await AccountChart.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id','Code', 'Name']
        });
        res.json(ac);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createAccountChart = async (req, res) => {
    const {
        Code,
        Name,
        AccountType,
        Type
    } = req.body;
    try {
        const acExist = await AccountChart.findOne({
            where: { 
                Code,
                Name,
                AccountType,
                Type
            }
        });
        if (acExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Account already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const ac = await AccountChart.create({
            Code,
            Name,
            AccountType,
            Type
        });
        res.status(201).json({ message: "Account chart created successfully.", ac });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateAccountChart = async (req, res) => {

    const { id } = req.params;
    const {
        Code,
        Name,
        AccountType,
        Type
    } = req.body;
  
    try {
        const ac = await AccountChart.findByPk(id);
        if (!ac) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Account chart not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const acExist = await AccountChart.findOne({
            where: {
                Code,
                Name,
                AccountType,
                Type,
                Id: { [Op.ne]: id }
            },
        });
        if (acExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Account chart is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await ac.update({
            Code,
            Name,
            AccountType,
            Type
        });
        res.status(200).json({ message: "Account chart updated successfully.", ac });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableAccountChart = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const ac = await AccountChart.findByPk(Id);
        if (!ac) {
            return res.status(404).json({ error: "Account chart not found." });
        }
        await ac.update({
            IsActive: false
        });
        res.status(200).json({ 
            message: "Account chart disabled successfully.", 
            ac 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableAccountChart = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const ac = await AccountChart.findByPk(Id);
        if (!ac) {
            return res.status(404).json({ 
                error: "Account chart not found." 
            });
        }
        await ac.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "Account chart enabled successfully.", 
            ac 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};