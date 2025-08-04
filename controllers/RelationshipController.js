const { Op } = require("sequelize");
const { Relationship } = require('../models');

exports.GetAllRelationships = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await Relationship.findAndCountAll({
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

exports.GetRelationship = async (req, res) => {
    try {
        const relationship = await Relationship.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });
        res.json(relationship);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.CreateRelationship = async (req, res) => {
    const { 
        Name 
    } = req.body;
    try {
        const rExist = await Relationship.findOne({
            where: { 
                Name
            }
        });
        if (rExist) {
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
        const relationship = await Relationship.create({
            Name
        });
        res.status(201).json({ 
            message: "record created.", 
            relationship 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.UpdateRelationship = async (req, res) => {

    const {
        Id
    } = req.params;
    const {
        Name
    } = req.body;
  
    try {
        const relationship = await Relationship.findByPk(Id);
        if (!relationship) {
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
        const rExist = await Relationship.findOne({
            where: {
                Name,
                Id: { [Op.ne]: Id }
            },
        });
        if (rExist) {
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
        await relationship.update({
            Name
        });
        res.status(200).json({ 
            message: "record modified.", 
            relationship 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.DisableRelationship = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const relationship = await Relationship.findByPk(Id);
        if (!relationship) {
            return res.status(404).json({ 
                error: "record not found." 
            });
        }
        await relationship.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "record disabled.", 
            relationship 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnableRelationship = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const relationship = await Relationship.findByPk(Id);
        if (!relationship) {
            return res.status(404).json({ 
                error: "record not found." 
            });
        }
        await relationship.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "record enabled.", 
            relationship 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};