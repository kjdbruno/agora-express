const { 
    Op 
} = require("sequelize");
const { 
    Sex 
} = require('../models');

exports.GetAllSexes = async (req, res) => {

    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {

        const { count, rows } = await Sex.findAndCountAll({
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

exports.GetSex = async (req, res) => {

    try {

        const sexes = await Sex.findAll({
            where: {
                IsActive: true
            },
            attributes: ['Id', 'Name']
        });

        res.json(sexes);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.CreateSex = async (req, res) => {

    const { 
        Name 
    } = req.body;

    try {

        const sexExist = await Sex.findOne({
            where: { 
                Name
            }
        });

        if (sexExist) {
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

        const sex = await Sex.create({
            Name
        });

        res.status(201).json({ 
            message: "record saved.", 
            sex 
        });

    } catch (error) {

        res.status(400).json({ 
            error: error.message 
        });

    }
};

exports.UpdateSex = async (req, res) => {

    const { 
        Id 
    } = req.params;

    const { 
        Name 
    } = req.body;
  
    try {

        const sex = await Sex.findByPk(Id);

        if (!sex) {
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

        const sexExist = await Sex.findOne({
            where: {
                Name,
                Id: { [Op.ne]: Id }
            },
        });

        if (sexExist) {
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

        await sex.update({
            Name
        });

        res.status(200).json({ 
            message: "record modified.",
            sex 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.DisableSex = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {

        const sex = await Sex.findByPk(Id);

        if (!sex) {
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

        await sex.update({ 
            IsActive: false 
        });

        res.status(200).json({ 
            message: "record disabled.", 
            sex 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.EnableSex = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {

        const sex = await Sex.findByPk(Id);

        if (!sex) {
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

        await sex.update({ 
            IsActive: true 
        });

        res.status(200).json({ 
            message: "record enabled.", 
            sex 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });
        
    }
};