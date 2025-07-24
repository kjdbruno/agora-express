const { Op } = require("sequelize");
const { 
    HealthRecord, 
    Resident, 
    HealthIllness, 
    Illness, 
    HealthIllnessMedication,
    Medication
} = require('../models');

const { fn, col, where } = require('sequelize');

exports.getAllHealthRecords = async (req, res) => {
    const {
        month
    } = req.query;
    try {
        const records = await HealthRecord.findAll({
            where: month
                ? where(fn('MONTH', col('HealthRecord.createdAt')), month)
                : {},
            include: [
                {
                    model: Resident,
                    as: 'resident'
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(records);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.createHealthRecord = async (req, res) => {
    const {
        ResidentId,
        VisitType,
        Height,
        Weight,
        BMI,
        BloodPressure,
        Temperature,
        PulseRate,
        Notes
    } = req.body;
    try {
        const record = await HealthRecord.create({ 
            ResidentId,
            VisitType,
            Height,
            Weight,
            BMI,
            BloodPressure,
            Temperature,
            PulseRate,
            Notes
        });
        res.status(201).json({ 
            message: "Health record created successfully.", 
            record 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.disableHealthRecord = async (req, res) => {

    const { 
        id 
    } = req.params;
  
    try {
        const record = await HealthRecord.findByPk(id);
        if (!record) {
            return res.status(404).json({ 
                error: "Health record not found." 
            });
        }
        await record.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "Health record disabled successfully.", 
            record 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.enableHealthRecord = async (req, res) => {

    const { 
        id 
    } = req.params;
  
    try {
        const record = await HealthRecord.findByPk(id);
        if (!record) {
            return res.status(404).json({ 
                error: "health record not found." 
            });
        }
        await record.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "health record enabled successfully.", 
            record 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.getAllHealthIllnesses = async (req, res) => {
    const {
        month
    } = req.query;
    try {
        const illnesses = await HealthIllness.findAll({
            where: month
                ? where(fn('MONTH', col('HealthIllness.createdAt')), month)
                : {},
            include: [
                {
                    model: Resident,
                    as: 'resident'
                },
                {
                    model: Illness,
                    as: 'illness'
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(illnesses);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.createHealthIllness = async (req, res) => {
    const {
        ResidentId,
        IllnessId,
        Notes
    } = req.body;
    try {
        const illness = await HealthIllness.create({ 
            ResidentId,
            IllnessId,
            Notes
        });
        res.status(201).json({ 
            message: "Health illness created successfully.", 
            illness 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.disableHealthIllness = async (req, res) => {

    const { 
        id 
    } = req.params;
  
    try {
        const illness = await HealthIllness.findByPk(id);
        if (!illness) {
            return res.status(404).json({ 
                error: "Health illness not found." 
            });
        }
        await illness.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "Health illness disabled successfully.", 
            illness 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.enableHealthIllness = async (req, res) => {

    const { 
        id 
    } = req.params;
  
    try {
        const illness = await HealthIllness.findByPk(id);
        if (!illness) {
            return res.status(404).json({ 
                error: "health illness not found." 
            });
        }
        await illness.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "health illness enabled successfully.", 
            illness 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.getAllHealthIllnessMedications = async (req, res) => {
    const {
        id
    } = req.query;
    try {
        const medications = await HealthIllnessMedication.findAll({
            where: {
                Id: id
            },
            include: [
                {
                    model: Medication,
                    as: 'medication'
                }
            ]
        });
        res.json(medications);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.createHealthIllnessMedication = async (req, res) => {
    const {
        HealthIllnessId,
        MedicationId,
        Dosage,
        Frequency,
        StartDate,
        EndDate,
        Notes
    } = req.body;
    try {
        const medication = await HealthIllnessMedication.create({ 
            HealthIllnessId,
            MedicationId,
            Dosage,
            Frequency,
            StartDate,
            EndDate,
            Notes
        });
        res.status(201).json({ 
            message: "Health illness created successfully.", 
            medication 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.disableHealthIllness = async (req, res) => {

    const { 
        id 
    } = req.params;
  
    try {
        const illness = await HealthIllness.findByPk(id);
        if (!illness) {
            return res.status(404).json({ 
                error: "Health illness not found." 
            });
        }
        await illness.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "Health illness disabled successfully.", 
            illness 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.enableHealthIllness = async (req, res) => {

    const { 
        id 
    } = req.params;
  
    try {
        const illness = await HealthIllness.findByPk(id);
        if (!illness) {
            return res.status(404).json({ 
                error: "health illness not found." 
            });
        }
        await illness.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "health illness enabled successfully.", 
            illness 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};