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

exports.getAllBlotters = async (req, res) => {
    try {
        const blotters = await Blotter.findAll({
            include: [
                {
                    model: BlotterType,
                    as: 'blotterType',
                }
            ]
        });
        res.json(blotters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createBlotter = async (req, res) => {
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

        res.status(201).json({ message: "Blotter created successfully.", blotter });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateBlotter = async (req, res) => {

    const { id } = req.params;
    const { 
        BlotterTypeId, 
        IncidentDate, 
        Location, 
        Description 
    } = req.body;
    try {
        const blotter = await Blotter.findByPk(id);
        if (!blotter) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Blotter not found!",
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

        res.status(200).json({ message: "Blotter updated successfully.", blotter });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableBlotter = async (req, res) => {

    const { id } = req.params;
  
    try {
        const blotter = await Blotter.findByPk(id);
        if (!blotter) {
            return res.status(404).json({ error: "Blotter not found." });
        }
        await blotter.update({ IsActive: false });
        res.status(200).json({ message: "Blotter disabled successfully.", blotter });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableBlotter = async (req, res) => {

    const { id } = req.params;
  
    try {
        const blotter = await Blotter.findByPk(id);
        if (!blotter) {
            return res.status(404).json({ error: "Blotter not found." });
        }
        await blotter.update({ IsActive: true });
        res.status(200).json({ message: "Blotter enabled successfully.", blotter });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllBlotterParties = async (req, res) => {

    const { id } = req.query;

    try {
        const blotters = await BlotterParty.findAll({
            where: {
                BlotterId: id
            },
            include: [
                {
                    model: Resident,
                    as: 'resident'
                }
            ]
        })
        res.json(blotters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createBlotterParty = async (req, res) => {
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
                        msg: "This party already exist!",
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
            res.status(201).json({ message: "Blotter party created successfully.", blotter });
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
                            msg: "Resident already exist!",
                            path: "name",
                            location: "body",
                        }],
                    });
                } else {
                    return res.status(403).json({
                        errors: [{
                            type: "manual",
                            value: "",
                            msg: "Person already exists!",
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
            res.status(201).json({ message: "Blotter party created successfully.", blotter });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.disableBlotterParty = async (req, res) => {

    const { id } = req.params;
  
    try {
        const blotter = await BlotterParty.findByPk(id);
        if (!blotter) {
            return res.status(404).json({ error: "Blotter party not found." });
        }
        await blotter.update({ IsActive: false });
        res.status(200).json({ message: "Blotter party disabled successfully.", blotter });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableBlotterParty = async (req, res) => {

    const { id } = req.params;
  
    try {
        const blotter = await BlotterParty.findByPk(id);
        if (!blotter) {
            return res.status(404).json({ error: "Blotter party not found." });
        }
        await blotter.update({ IsActive: true });
        res.status(200).json({ message: "Blotter party enabled successfully.", blotter });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllBlotterHandlers = async (req, res) => {

    const { id } = req.query;

    try {
        const blotters = await BlotterHandler.findAll({
            where: {
                BlotterId: id
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
        res.json(blotters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createBlotterHandler = async (req, res) => {
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
                    msg: "Handler already exists!",
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

        res.status(201).json({ message: "Blotter handler created successfully.", blotter });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.disableBlotterHandler = async (req, res) => {

    const { id } = req.params;
  
    try {
        const blotter = await BlotterHandler.findByPk(id);
        if (!blotter) {
            return res.status(404).json({ error: "Blotter handler not found." });
        }
        await blotter.update({ IsActive: false });
        res.status(200).json({ message: "Blotter handler disabled successfully.", blotter });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableBlotterHandler = async (req, res) => {

    const { id } = req.params;
  
    try {
        const blotter = await BlotterHandler.findByPk(id);
        if (!blotter) {
            return res.status(404).json({ error: "Blotter handler not found." });
        }
        await blotter.update({ IsActive: true });
        res.status(200).json({ message: "Blotter handler enabled successfully.", blotter });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllBlotterActions = async (req, res) => {

    const { id } = req.query;

    try {
        const blotters = await BlotterAction.findAll({
            where: {
                BlotterId: id
            }
        });
        res.json(blotters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createBlotterAction = async (req, res) => {
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

        res.status(201).json({ message: "Blotter action created successfully.", blotter });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.disableBlotterAction = async (req, res) => {

    const { id } = req.params;
  
    try {
        const blotter = await BlotterAction.findByPk(id);
        if (!blotter) {
            return res.status(404).json({ error: "Blotter action not found." });
        }
        await blotter.update({ IsActive: false });
        res.status(200).json({ message: "Blotter action disabled successfully.", blotter });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableBlotterAction = async (req, res) => {

    const { id } = req.params;
  
    try {
        const blotter = await BlotterAction.findByPk(id);
        if (!blotter) {
            return res.status(404).json({ error: "Blotter action not found." });
        }
        await blotter.update({ IsActive: true });
        res.status(200).json({ message: "Blotter action enabled successfully.", blotter });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllBlotterAttachments = async (req, res) => {

    const { id } = req.query;

    try {
        const blotters = await BlotterAttachment.findAll({
            where: {
                BlotterId: id
            }
        });
        res.json(blotters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createBlotterAttachment = async (req, res) => {
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

        res.status(201).json({ message: "Blotter attachment created successfully.", attachments});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteBlotterAttachment = async (req, res) => {

    const { id } = req.params;
  
    try {
        const attachment = await BlotterAttachment.findByPk(id);
        if (!attachment) {
            return res.status(404).json({ message: 'Attachment not found.' });
        }
        
        const filePath = path.join(__dirname, '../public/uploads', attachment.File);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await attachment.destroy();
        res.status(200).json({ message: "Blotter attachment deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllBlotterActionAttachments = async (req, res) => {

    const { id } = req.query;

    try {
        const blotters = await BlotterActionAttachment.findAll({
            where: {
                BlotterActionId: id
            }
        });
        res.json(blotters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createBlotterActionAttachment = async (req, res) => {
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
        res.status(201).json({ message: "Blotter attachment created successfully.", attachments});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteBlotterActionAttachment = async (req, res) => {

    const { id } = req.params;
  
    try {
        const attachment = await BlotterActionAttachment.findByPk(id);
        if (!attachment) {
            return res.status(404).json({ message: 'Attachment not found.' });
        }
        
        const filePath = path.join(__dirname, '../public/uploads', attachment.File);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await attachment.destroy();
        res.status(200).json({ message: "Blotter attachment deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
