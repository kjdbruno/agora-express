const { Op } = require("sequelize");
const { BarangaySetting, Province, Town, Barangay } = require('../models');

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');

exports.getAllBarangaySettings = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await BarangaySetting.findAndCountAll(
            {
                Limit,
                Offset,
                order: [['Id', 'ASC']]
            },
            {
                include: [
                    {
                        model: Town,
                        as: 'town',
                        attributes: ['Name']
                    },
                    {
                        model: Province,
                        as: 'province',
                        attributes: ['Name']
                    },
                    {
                        model: Barangay,
                        as: 'barangay',
                        attributes: ['Name']
                    }
                ]
            }
        );
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

exports.createBarangaySetting = async (req, res) => {
    const { BarangayId, TownId, ProvinceId } = req.body;
    const file = req.file; // From Multer
    try {
        const bsExist = await BarangaySetting.findOne({
            where: { 
                [Op.or]: [{ BarangayId }] 
            }
        });
        if (bsExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Setting already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }

        // Save photos (if any)
        if (file) {
            const filename = `seal-${Date.now()}${path.extname(file.originalname)}`;
            const uploadPath = path.join(__dirname, '../public/uploads', filename);

            await sharp(file.buffer)
                .resize({ width: 800 })
                .jpeg({ quality: 80 })
                .toFile(uploadPath);

            const bs = await BarangaySetting.create({ Seal: filename, BarangayId, TownId, ProvinceId });
            return res.status(201).json({ message: "Barangay Setting created successfully.", bs });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateBarangaySetting = async (req, res) => {

    const { id } = req.params;
    const { BarangayId, TownId, ProvinceId } = req.body;
    const file = req.file; // From Multer

    try {
        const bs = await BarangaySetting.findByPk(id);
        if (!bs) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Setting not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const bsExist = await BarangaySetting.findOne({
            where: {
                [Op.or]: [{ BarangayId }, {TownId}, {ProvinceId} ],
                Id: { [Op.ne]: id }
            },
        });
        if (bsExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Setting is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        // Update photos (if any)
        if (file) {
            const filename = `seal-${Date.now()}${path.extname(file.originalname)}`;
            const uploadPath = path.join(__dirname, '../public/uploads', filename);

            await sharp(file.buffer)
                .resize({ width: 800 })
                .jpeg({ quality: 80 })
                .toFile(uploadPath);

            // Delete old file if exists
            if (bs.Seal) {
                const oldFilePath = path.join(__dirname, '../public/uploads', bs.Seal);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }

            await bs.update({ Seal: filename, BarangayId, TownId, ProvinceId });
            res.status(200).json({ message: "Barangay Setting updated successfully.", bs });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
