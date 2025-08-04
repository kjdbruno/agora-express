const { Op } = require("sequelize");
const { OfficialSetting, Position, Resident, BarangaySetting } = require('../models');

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');

exports.GetAllOfficialSetting = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await OfficialSetting.findAndCountAll({
            include: [
                {
                    model: Resident,
                    as: 'resident',
                    attributes: ['Firstname', 'Middlename', 'Lastname', 'Suffix']
                },
                {
                    model: Position,
                    as: 'position',
                    attributes: ['Id', 'Name']
                }
            ],
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

exports.CreateOfficialSetting = async (req, res) => {
    const { 
        ResidentId, 
        PositionId, 
        IsSignatory 
    } = req.body;
    const file = req.file;
    try {
        const osExist = await OfficialSetting.findOne({
            where: { 
                ResidentId,
                PositionId
            }
        });
        if (osExist) {
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
        // get BarangaySettingId from BarangaySetting
        const barangaySetting = await BarangaySetting.findOne({
            attributes: ['Id']
        });

        // Save photos (if any)
        if (file) {
            const filename = `signature-${Date.now()}${path.extname(file.originalname)}`;
            const uploadPath = path.join(__dirname, '../public/uploads', filename);

            await sharp(file.buffer)
                .resize({ width: 800 })
                .jpeg({ quality: 80 })
                .toFile(uploadPath);

            const os = await OfficialSetting.create({ 
                ResidentId, 
                PositionId, 
                IsSignatory, 
                Signature: filename, 
                BarangaySettingId: barangaySetting.Id 
            });
            return res.status(201).json({ 
                message: "Officrecord created.", 
                os 
            });
        }
        
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.UpdateOfficialSetting = async (req, res) => {

    const {
        Id
    } = req.params;
    const { 
        ResidentId, 
        PositionId, 
        IsSignatory 
    } = req.body;
    const file = req.file;
  
    try {
        const os = await OfficialSetting.findByPk(Id);
        if (!os) {
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
        const osExist = await OfficialSetting.findOne({
            where: {
                ResidentId,
                PositionId,
                Id: { [Op.ne]: Id }
            },
        });
        if (osExist) {
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
        // get BarangaySettingId from BarangaySetting
        const barangaySetting = await BarangaySetting.findOne({
            attributes: ['Id']
        });
        // Save photos (if any)
        if (file) {
            const filename = `signature-${Date.now()}${path.extname(file.originalname)}`;
            const uploadPath = path.join(__dirname, '../public/uploads', filename);

            await sharp(file.buffer)
                .resize({ width: 800 })
                .jpeg({ quality: 80 })
                .toFile(uploadPath);

            await os.update({ 
                ResidentId, 
                PositionId, 
                IsSignatory, 
                Signature: filename, 
                BarangaySettingId: barangaySetting.Id 
            });
            return res.status(200).json({ 
                message: "record modified.", 
                os 
            });
        }
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.DisableOfficialSetting = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const os = await OfficialSetting.findByPk(Id);
        if (!os) {
            return res.status(404).json({ 
                error: "record not found." 
            });
        }
        await os.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "record disabled.", 
            os 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnableOfficialSetting = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const os = await OfficialSetting.findByPk(Id);
        if (!os) {
            return res.status(404).json({ 
                error: "record not found." 
            });
        }
        await os.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "record enabled.",
            os 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};