const { Op } = require("sequelize");
const { 
    BlotterType, 
    Blotter, 
    BlotterParty, 
    BlotterHandler, 
    BlotterAction, 
    BlotterAttachment, 
    BlotterActionAttachment,
    Resident,
    OfficialSetting,
    Position
} = require('../models');

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');

exports.GetAllBlotters = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await Blotter.findAndCountAll({
            Limit,
            Offset,
            order: [['Id', 'ASC']],
            include: [
                {
                    model: BlotterType,
                    as: 'blotterType',
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

exports.CreateBlotter = async (req, res) => {

    const { 
        BlotterTypeId, 
        IncidentDate, 
        Location, 
        Description 
    } = req.body;

    try {
        
        const currentYear = new Date().getFullYear();
        let CaseNo;
        const lastBlotter = await Blotter.findOne({
            where: {
                CreatedAt: {
                    [Op.gte]: new Date(`${currentYear}-01-01`),
                    [Op.lt]: new Date(`${currentYear + 1}-01-01`)
                }
            },
            order: [['Id', 'DESC']],
            attributes: ['CaseNo']
        });
        if (!lastBlotter) {
            CaseNo = `BLT${currentYear}-0001`;
        } else {
            const lastNo = parseInt(lastBlotter.CaseNo.split('-')[1]);
            CaseNo = `BLT${currentYear}-${String(lastNo + 1).padStart(4, '0')}`;
        }

        const blotter = await Blotter.create({
            BlotterTypeId,
            CaseNo,
            IncidentDate,
            Location,
            Description
        });

        res.status(201).json({ 
            message: "record created.", 
            blotter 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.UpdateBlotter = async (req, res) => {

    const { 
        Id 
    } = req.params;
    const { 
        BlotterTypeId, 
        IncidentDate, 
        Location, 
        Description 
    } = req.body;

    try {
        const blotter = await Blotter.findByPk(Id);
        if (!blotter) {
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
        await blotter.update({
            BlotterTypeId,
            IncidentDate,
            Location,
            Description
        });

        res.status(200).json({ 
            message: "record modified.", 
            blotter 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.disableBlotter = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const blotter = await Blotter.findByPk(Id);
        if (!blotter) {
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
        await blotter.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "record disabled.", 
            blotter 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnableBlotter = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const blotter = await Blotter.findByPk(Id);
        if (!blotter) {
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
        await blotter.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "record enabled.", 
            blotter 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.GetAllBlotterParties = async (req, res) => {

    const {
        Id
    } = req.query;
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {
        const { count, rows } = await BlotterParty.findAndCountAll({
            Limit,
            Offset,
            order: [['Id', 'ASC']],
            where: {
                BlotterId: Id
            },
            include: [
                {
                    model: Resident,
                    as: 'resident'
                }
            ]
        })
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

exports.CreateBlotterParty = async (req, res) => {

    const { 
        Firstname,
        Middlename,
        Lastname,
        Suffix,
        BlotterId,
        ResidentId,
        Role,
        Statement
    } = req.body;

    try {
        if (ResidentId) {
            const partyExists = await BlotterParty.findOne({
                where: {
                    BlotterId,
                    ResidentId
                }
            });
            if (partyExists) {
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
            const blotter = await BlotterParty.create({
                BlotterId,
                ResidentId,
                Role,
                Statement
            });
            res.status(201).json({ 
                message: "Blotter party created successfully.", 
                blotter 
            });
        } else {
            const rExist = await Resident.findOne({
                where: { 
                    Firstname,
                    Middlename,
                    Lastname
                }
            });
            if (rExist) {
                if (rExist.IsResident) {
                    return res.status(403).json({
                        errors: [{
                            type: "manual",
                            value: "",
                            msg: "record already exist!",
                            path: "name",
                            location: "body",
                        }],
                    });
                } else {
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
            }
            const resident = await Resident.create({
                Firstname,
                Middlename,
                Lastname,
                Suffix,
                IsResident: false
            });
            const blotter = await BlotterParty.create({
                BlotterId,
                ResidentId: resident.Id,
                Role,
                Statement
            });
            res.status(201).json({ 
                message: "record created.", 
                blotter 
            });
        }
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.DisableBlotterParty = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const blotter = await BlotterParty.findByPk(Id);
        if (!blotter) {
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
        await blotter.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "record disabled.", 
            blotter 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnableBlotterParty = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const blotter = await BlotterParty.findByPk(Id);
        if (!blotter) {
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
        await blotter.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "record enabled.", 
            blotter 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.GetAllBlotterHandlers = async (req, res) => {

    const {
        Id
    } = req.query;
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {
        const { count, rows } = await BlotterHandler.findAndCountAll({
            Limit,
            Offset,
            order: [['Id', 'ASC']],
            where: {
                BlotterId: Id
            },
            include: [
                {
                    model: OfficialSetting,
                    as: 'official',
                    include: [
                        {
                            model: Resident,
                            as: 'resident'
                        },
                        {
                            model: Position,
                            as: 'position'
                        }
                    ]
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

exports.CreateBlotterHandler = async (req, res) => {

    const { 
        BlotterId,
        OfficialId,
        Role
    } = req.body;

    try {
        const bhExist = await BlotterHandler.findOne({
            where: { 
                BlotterId,
                OfficialId
            }
        });
        if (bhExist) {
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

        const blotter = await BlotterHandler.create({
            BlotterId,
            OfficialId,
            Role
        });

        res.status(201).json({ 
            message: "record created.", 
            blotter 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.DisableBlotterHandler = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const blotter = await BlotterHandler.findByPk(Id);
        if (!blotter) {
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
        await blotter.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "record disabled.", 
            blotter 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnableBlotterHandler = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const blotter = await BlotterHandler.findByPk(id);
        if (!blotter) {
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
        await blotter.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "record enabled.", 
            blotter 
        });
    } catch (error) {
        res.status(500).json({
            error: error.message 
        });
    }
};

exports.GetAllBlotterActions = async (req, res) => {

    const {
        Id
    } = req.query;
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {
        const { count, rows } = await BlotterAction.findAndCountAll({
            Limit,
            Offset,
            order: [['Id', 'ASC']],
            where: {
                BlotterId: Id
            }
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

exports.CreateBlotterAction = async (req, res) => {

    const { 
        BlotterId,
        Action,
        Date,
        Remarks
    } = req.body;

    try {
        const blotter = await BlotterAction.create({
            BlotterId,
            Action,
            Date,
            Remarks
        });

        res.status(201).json({ 
            message: "record created.", 
            blotter 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.DisableBlotterAction = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const blotter = await BlotterAction.findByPk(Id);
        if (!blotter) {
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
        await blotter.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "record disabled.", 
            blotter 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnableBlotterAction = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const blotter = await BlotterAction.findByPk(id);
        if (!blotter) {
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
        await blotter.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "record enabled.", 
            blotter 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.GetAllBlotterAttachments = async (req, res) => {

    const {
        Id
    } = req.query;

    try {
        const blotters = await BlotterAttachment.findAll({
            where: {
                BlotterId: Id
            }
        });
        res.json(blotters);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.CreateBlotterAttachment = async (req, res) => {

    const { 
        BlotterId
    } = req.body;
    const files = req.files; // From Multer

    try {
        if (files && files.length > 0) {

            for (const file of files) {
                const filename = `attachment-${BlotterId}-${Date.now()}-${Math.floor(Math.random() * 10000)}${path.extname(file.originalname)}`;
                const uploadPath = path.join(__dirname, '../public/uploads', filename);

                await sharp(file.buffer)
                    .resize({ width: 800 })
                    .jpeg({ quality: 80 })
                    .toFile(uploadPath);

                // Save each to DB or just collect for later use
                await BlotterAttachment.create({
                    BlotterId,
                    File: filename,
                });
            }
        }
        const attachments = await BlotterAttachment.findAll({
            where: {
                BlotterId
            }
        })

        res.status(201).json({ 
            message: "record created.", 
            attachments
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.DeleteBlotterAttachment = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const attachment = await BlotterAttachment.findByPk(Id);
        if (!attachment) {
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
        
        const filePath = path.join(__dirname, '../public/uploads', attachment.File);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await attachment.destroy();
        res.status(200).json({ 
            message: "record deleted." 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.GetAllBlotterActionAttachments = async (req, res) => {

    const {
        Id
    } = req.query;

    try {
        const blotters = await BlotterActionAttachment.findAll({
            where: {
                BlotterActionId: Id
            }
        });
        res.json(blotters);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.CreateBlotterActionAttachment = async (req, res) => {

    const { 
        BlotterActionId
    } = req.body;
    const files = req.files; // From Multer

    try {
        if (files && files.length > 0) {

            for (const file of files) {
                const filename = `attachment-${BlotterActionId}-${Date.now()}-${Math.floor(Math.random() * 10000)}${path.extname(file.originalname)}`;
                const uploadPath = path.join(__dirname, '../public/uploads', filename);

                await sharp(file.buffer)
                    .resize({ width: 800 })
                    .jpeg({ quality: 80 })
                    .toFile(uploadPath);

                // Save each to DB or just collect for later use
                await BlotterActionAttachment.create({
                    BlotterActionId,
                    File: filename,
                });
            }
        }
        const attachments = await BlotterActionAttachment.findAll({
            where: {
                BlotterActionId
            }
        })
        res.status(201).json({ 
            message: "record created.", 
            attachments
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.DeleteBlotterActionAttachment = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const attachment = await BlotterActionAttachment.findByPk(Id);
        if (!attachment) {
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
        
        const filePath = path.join(__dirname, '../public/uploads', attachment.File);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await attachment.destroy();
        res.status(200).json({ 
            message: "record deleted." 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};
