const { Op } = require("sequelize");
const { 
    BlotterType, 
    Blotter, 
    BlotterParty, 
    BlotterHandler, 
    BlotterAction, 
    BlotterAttachment, 
    BlotterActionAttachment
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
    const files = req.files; // From Multer
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
            CaseNo = `BLT-${String(lastNo + 1).padStart(4, '0')}`;
        }

        const blotter = await Blotter.create({
            BlotterTypeId,
            CaseNo,
            IncidentDate,
            Location,
            Description
        });

        if (files && files.length > 0) {

            for (const file of files) {
                const filename = `${CaseNo}-${Date.now()}${path.extname(file.originalname)}`;
                const uploadPath = path.join(__dirname, '../public/uploads/attachments', filename);

                await sharp(file.buffer)
                    .resize({ width: 800 })
                    .jpeg({ quality: 80 })
                    .toFile(uploadPath);

                // Save each to DB or just collect for later use
                await BlotterAttachment.create({
                    BlotterId: blotter.Id,
                    Filename: filename,
                });
            }
        }

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
    const Files = req.Files; // From Multer
  
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

        if (Files && Files.length > 0) {
            for (const file of Files) {
                const filename = `${blotter.CaseNo}-${Date.now()}-${Math.floor(Math.random() * 1000)}${path.extname(file.originalname)}`;
                const uploadPath = path.join(__dirname, '../public/uploads/attachments', filename);

                await sharp(file.buffer)
                    .resize({ width: 800 })
                    .jpeg({ quality: 80 })
                    .toFile(uploadPath);

                await BlotterAttachment.create({
                    BlotterId: blotter.Id,
                    Filename: filename,
                });
            }
        }

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