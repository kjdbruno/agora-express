const { Op } = require("sequelize");
const { CertificationSetting } = require('../models');

exports.getAllCertificatioSettings = async (req, res) => {
    try {
        const cs = await CertificationSetting.findAll();
        res.json(cs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCertificationSetting = async (req, res) => {
    try {
        const cs = await CertificationSetting.findAll({
            where: {
                IsActive: true
            }
        });
        res.json(cs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCertificationSetting = async (req, res) => {
    const { CertificationTypeId, Cost, Surcharge, Interest, Month } = req.body;
    try {
        const csExist = await CertificationSetting.findOne({
            where: { 
                [Op.or]: [{ CertificationTypeId, Month }] 
            }
        });
        if (csExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Certification setting already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const cs = await CertificationSetting.create({ CertificationTypeId, Cost, Surcharge, Interest, Month });
        res.status(201).json({ message: "Certification setting created successfully.", cs });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateCertificationSetting = async (req, res) => {

    const { id } = req.params;
    const { CertificationTypeId, Cost, Surcharge, Interest, Month } = req.body;
  
    try {
        const cs = await CertificationSetting.findByPk(id);
        if (!cs) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Certification setting not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const csExist = await CertificationSetting.findOne({
            where: {
                [Op.or]: [{ CertificationTypeId, Month } ],
                Id: { [Op.ne]: id }
            },
        });
        if (csExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Certification setting is already in use!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await cs.update({ CertificationTypeId, Cost, Surcharge, Interest, Month });
        res.status(200).json({ message: "Certification setting updated successfully.", cs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableCertificationSetting = async (req, res) => {

    const { id } = req.params;
  
    try {
        const cs = await CertificationSetting.findByPk(id);
        if (!cs) {
            return res.status(404).json({ error: "Certification setting not found." });
        }
        await cs.update({ IsActive: false });
        res.status(200).json({ message: "Certification setting disabled successfully.", cs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableCertificationSetting = async (req, res) => {

    const { id } = req.params;
  
    try {
        const cs = await CertificationSetting.findByPk(id);
        if (!cs) {
            return res.status(404).json({ error: "Certification setting not found." });
        }
        await cs.update({ IsActive: true });
        res.status(200).json({ message: "Certification setting enabled successfully.", cs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};