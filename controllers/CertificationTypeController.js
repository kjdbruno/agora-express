const { Op } = require("sequelize");
const { CertificationType } = require('../models');

exports.getAllCertificationTypes = async (req, res) => {
    try {
        const ct = await CertificationType.findAll();
        res.json(ct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCertificationType = async (req, res) => {
    try {
        const ct = await CertificationType.findAll({
            where: {
                IsActive: true
            }
        });
        res.json(ct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCertificationType = async (req, res) => {
    const { Name, IsBusiness, IsCedula, IsCustom } = req.body;
    try {
        const ctExist = await CertificationType.findOne({
            where: { 
                [Op.or]: [{ Name }] 
            }
        });
        if (ctExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Certification type already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const ct = await CertificationType.create({ Name, IsBusiness, IsCedula, IsCustom });
        res.status(201).json({ message: "Certification type created successfully.", ct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateCertificationType = async (req, res) => {

    const { id } = req.params;
    const { Name, IsBusiness, IsCedula, IsCustom } = req.body;
  
    try {
        const ct = await CertificationType.findByPk(id);
        if (!ct) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Certification type not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const ctExist = await CertificationType.findOne({
            where: {
                [Op.or]: [{ Name } ],
                Id: { [Op.ne]: id }
            },
        });
        if (ctExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Certification typr is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await ct.update({ Name, IsBusiness, IsCedula, IsCustom });
        res.status(200).json({ message: "Certification type updated successfully.", ct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableCertificationType = async (req, res) => {

    const { id } = req.params;
  
    try {
        const ct = await CertificationType.findByPk(id);
        if (!ct) {
            return res.status(404).json({ error: "Certification type not found." });
        }
        await ct.update({ IsActive: false });
        res.status(200).json({ message: "Certification type disabled successfully.", ct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableCertificationType = async (req, res) => {

    const { id } = req.params;
  
    try {
        const ct = await CertificationType.findByPk(id);
        if (!ct) {
            return res.status(404).json({ error: "Certification type not found." });
        }
        await ct.update({ IsActive: true });
        res.status(200).json({ message: "Certification type enabled successfully.", ct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};