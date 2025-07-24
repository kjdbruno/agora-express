const { Op } = require("sequelize");
const { 
    HealthServiceAvailment, 
    HealthService,
    Resident,
    HealthMaternalRecord,
    HealthPrenatal,
    HealthDelivery,
    HealthPostnatal,
    HealthDisease,
    HealthIllness,
    HealthImmunization,
    HealthIntervention,
    HealthRecord,
    Vaccine,
    OfficialSetting,
    Disease,
    Illness,
    Medication
} = require('../models');

const { fn, col, where } = require('sequelize');

exports.getAllServiceAvailments = async (req, res) => {
    const {
        Month
    } = req.query;
    try {
        const availmentRecords = await HealthServiceAvailment.findAll({
            where: Month
                ? where(fn('MONTH', col('HealthServiceAvailment.createdAt')), Month)
                : {},
            include: [
                {
                    model: HealthService,
                    as: 'healthservice'
                },
                {
                    model: Resident,
                    as: 'resident'
                },
                {
                    model: HealthService,
                    as: 'healthservice'
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(availmentRecords);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.getAllHealthRecords = async (req, res) => {
    const {
        HealthRecordId
    } = req.params;
    try {
        const healthRecords = await HealthRecord.findOne({
            where: {
                Id: HealthRecordId
            }
        });
        res.json(healthRecords);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.createHealthRecord = async (req, res) => {
    const {
        ResidentId,
        ServiceId,
        Height,
        Weight,
        BMI,
        BloodPressure,
        Temperature,
        PulseRate,
        Notes
    } = req.body;
    try {
        const serviceRecord = await HealthServiceAvailment.create({
            ResidentId,
            ServiceId
        });
        const healthRecord = await HealthRecord.create({ 
            ServiceAvailmentId: serviceRecord.Id,
            Height,
            Weight,
            BMI,
            BloodPressure,
            Temperature,
            PulseRate,
            Notes
        });
        res.status(201).json({ 
            message: "Consultation created successfully.", 
            serviceRecord,
            healthRecord 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.updateHealthRecord = async (req, res) => {

    const { id } = req.params;
    const {
        Height,
        Weight,
        BMI,
        BloodPressure,
        Temperature,
        PulseRate,
        Notes
    } = req.body;
  
    try {
        const healthRecord = await HealthRecord.findByPk(id);
        if (!healthRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await HealthRecord.update({ 
            Height,
            Weight,
            BMI,
            BloodPressure,
            Temperature,
            PulseRate,
            Notes
         });
        res.status(200).json({ 
            message: "Record updated successfully.", 
            healthRecord 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.disableHealthRecord = async (req, res) => {

    const {
        id
    } = req.params;
  
    try {
        const healthRecord = await HealthRecord.findByPk(id);
        if (!healthRecord) {
           return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await healthRecord.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "Record disabled successfully.", 
            healthRecord 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.enableHealthRecord = async (req, res) => {

    const { id } = req.params;
  
    try {
        const healthRecord = await HealthRecord.findByPk(id);
        if (!healthRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await healthRecord.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "Record enabled successfully.", 
            healthRecord 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.getAllMaternalRecords = async (req, res) => {
    const {
        id
    } = req.query;
    try {
        const maternalRecords = await HealthMaternalRecord.findAll({
            where: {
                ServiceAvailmentId: id
            },
            order: [['createdAt', 'DESC']]
        });
        res.json(maternalRecords);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.createMaternalRecord = async (req, res) => {
    const {
        ResidentId,
        ServiceId,
        Height,
        Weight,
        BMI,
        BloodPressure,
        Temperature,
        PulseRate,
        Notes,
        LMP,
        EDD,
        IsHighRisk,
        RiskFactors,
        Status,
        Purpose
    } = req.body;
    try {
        // Create Service Availed
        const serviceRecord = await HealthServiceAvailment.create({
            ResidentId,
            ServiceId
        });
        // Create Health Record
        const healthRecord = await HealthRecord.create({ 
            ServiceAvailmentId: serviceRecord.Id,
            Height,
            Weight,
            BMI,
            BloodPressure,
            Temperature,
            PulseRate,
            Notes
        });
        // Validate If Resident has ongoing maternal record
        const hasOngoingMaternalRecord = await HealthMaternalRecord.findOne({
            where: {
                Status: 'Ongoing'
            },
            include: [
                {
                    model: HealthServiceAvailment,
                    as: 'healthserviceavailment',
                    where: { 
                        ResidentId,
                        ServiceId
                    },
                }
            ]
        });
        if (hasOngoingMaternalRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Patient has ongoing maternal record!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        // Create Maternal Record
        const maternalRecord = await HealthMaternalRecord.create({
            ServiceAvailmentId: serviceRecord.Id,
            LMP,
            EDD,
            IsHighRisk,
            RiskFactors,
            Status,
            Purpose
        });
        res.status(201).json({ 
            message: "Maternal consultation created successfully.", 
            serviceRecord,
            healthRecord,
            maternalRecord
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.updateMaternalRecord = async (req, res) => {

    const {
        HealthRecordId,
        MaternalRecordId
    } = req.params;
    const {
        Height,
        Weight,
        BMI,
        BloodPressure,
        Temperature,
        PulseRate,
        Notes,
        LMP,
        EDD,
        IsHighRisk,
        RiskFactors,
        Status,
        Purpose
    } = req.body;
  
    try {
        const healthRecord = await HealthRecord.findByPk(HealthRecordId);
        if (!healthRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const maternalRecord = await HealthMaternalRecord.findByPk(MaternalRecordId);
        if (!maternalRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await HealthRecord.update({ 
            Height,
            Weight,
            BMI,
            BloodPressure,
            Temperature,
            PulseRate,
            Notes
         });
         await HealthMaternalRecord.update({ 
            LMP,
            EDD,
            IsHighRisk,
            RiskFactors,
            Status,
            Purpose
         });
        res.status(200).json({ 
            message: "Record updated successfully.", 
            healthRecord,
            maternalRecord
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.disableMaternalRecord = async (req, res) => {

    const {
        id
    } = req.params;
  
    try {
        const maternalRecord = await HealthMaternalRecord.findByPk(id);
        if (!maternalRecord) {
           return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await maternalRecord.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "Record disabled successfully.", 
            maternalRecord 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.enableMaternalRecord = async (req, res) => {

    const { id } = req.params;
  
    try {
        const maternalRecord = await HealthMaternalRecord.findByPk(id);
        if (!maternalRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await maternalRecord.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "Record enabled successfully.", 
            maternalRecord 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.getAllImmunizationRecords = async (req, res) => {
    const {
        id
    } = req.query;
    try {
        const immunizationRecords = await HealthImmunization.findAll({
            where: {
                ServiceAvailmentId: id
            },
            include: [
                {
                    model: Vaccine,
                    as: 'vaccine'
                },
                {
                    model: OfficialSetting,
                    as: 'official'
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(immunizationRecords);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.createImmunizationRecord = async (req, res) => {
    const {
        ResidentId,
        ServiceId,
        Height,
        Weight,
        BMI,
        BloodPressure,
        Temperature,
        PulseRate,
        Notes,
        VaccineId,
        Dosage,
        ScheduleDate,
        GivenDate,
        Status,
        OfficialId
    } = req.body;
    try {
        // Create Service Availed
        const serviceRecord = await HealthServiceAvailment.create({
            ResidentId,
            ServiceId
        });
        // Create Health Record
        const healthRecord = await HealthRecord.create({ 
            ServiceAvailmentId: serviceRecord.Id,
            Height,
            Weight,
            BMI,
            BloodPressure,
            Temperature,
            PulseRate,
            Notes
        });
        // Create Immunization Record
        const immunizationRecord = await HealthImmunization.create({
            ServiceAvailmentId: serviceRecord.Id,
            VaccineId,
            Dosage,
            ScheduleDate,
            GivenDate,
            Status,
            OfficialId
        })
        res.status(201).json({ 
            message: "Immunization created successfully.", 
            serviceRecord,
            healthRecord,
            immunizationRecord
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.updateImmunizationRecord = async (req, res) => {

    const {
        HealthRecordId,
        ImmunizationRecordId
    } = req.params;
    const {
        Height,
        Weight,
        BMI,
        BloodPressure,
        Temperature,
        PulseRate,
        Notes,
        VaccineId,
        Dosage,
        ScheduleDate,
        GivenDate,
        Status,
        OfficialId
    } = req.body;
  
    try {
        const healthRecord = await HealthRecord.findByPk(HealthRecordId);
        if (!healthRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const immunizationRecord = await HealthImmunization.findByPk(ImmunizationRecordId);
        if (!immunizationRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await HealthRecord.update({ 
            Height,
            Weight,
            BMI,
            BloodPressure,
            Temperature,
            PulseRate,
            Notes
         });
         await HealthImmunization.update({ 
            VaccineId,
            Dosage,
            ScheduleDate,
            GivenDate,
            Status,
            OfficialId
         });
        res.status(200).json({ 
            message: "Record updated successfully.", 
            healthRecord,
            immunizationRecord
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.disableImmunizationRecord = async (req, res) => {

    const {
        id
    } = req.params;
  
    try {
        const immunizationRecord = await HealthImmunization.findByPk(id);
        if (!immunizationRecord) {
           return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await immunizationRecord.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "Record disabled successfully.", 
            immunizationRecord 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.enableImmunizationRecord = async (req, res) => {

    const { id } = req.params;
  
    try {
        const immunizationRecord = await HealthImmunization.findByPk(id);
        if (!immunizationRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await immunizationRecord.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "Record enabled successfully.", 
            immunizationRecord 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.getAllPrenatalRecords = async (req, res) => {
    const {
        id
    } = req.query;
    try {
        const prenatalRecords = await HealthPrenatal.findAll({
            where: {
                MaternalRecordId: id
            },
            order: [['createdAt', 'DESC']]
        });
        res.json(prenatalRecords);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.createPrenatalRecord = async (req, res) => {
    const {
        MaternalRecordId,
        Purpose
    } = req.body;
    try {
        const prenatalRecord = await HealthPrenatal.create({
            MaternalRecordId,
            Purpose
        });
        res.status(201).json({ 
            message: "Prenatal consultation created successfully.", 
            prenatalRecord
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.updatePrenatalRecord = async (req, res) => {

    const {
        Id
    } = req.params;
    const {
        Purpose
    } = req.body;
  
    try {
        const prenatalRecord = await HealthPrenatal.findByPk(Id);
        if (!prenatalRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await prenatalRecord.update({ 
            Purpose
         });
        res.status(200).json({ 
            message: "Record updated successfully.", 
            prenatalRecord
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.disablePrenatalRecord = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const prenatalRecord = await HealthPrenatal.findByPk(Id);
        if (!prenatalRecord) {
           return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await prenatalRecord.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "Record disabled successfully.", 
            prenatalRecord 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.enablePrenatalRecord = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const prenatalRecord = await HealthPrenatal.findByPk(Id);
        if (!prenatalRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await prenatalRecord.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "Record enabled successfully.", 
            prenatalRecord 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.getAllDeliveryRecords = async (req, res) => {
    const {
        id
    } = req.query;
    try {
        const deliveryRecords = await HealthDelivery.findAll({
            where: {
                MaternalRecordId: id
            },
            include: [
                {
                    model: Resident,
                    as: 'resident'
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(deliveryRecords);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.createDeliveryRecord = async (req, res) => {
    const {
        Firstname,
        Middlename,
        Lastname,
        Suffix,
        MaternalRecordId,
        DeliveryDate,
        DeliveryPlace,
        DeliveryType,
        BirthWeight,
        BirthLength,
        AgparScore
    } = req.body;
    try {
        const babyRecord = await Resident.create({
            Firstname,
            Middlename,
            Lastname,
            Suffix,
            IsResident: true
        });
        const deliveryRecord = await HealthDelivery.create({
            ResidentId: babyRecord.Id,
            MaternalRecordId,
            DeliveryDate,
            DeliveryPlace,
            DeliveryType,
            BirthWeight,
            BirthLength,
            AgparScore,
            Notes
        });
        res.status(201).json({ 
            message: "Delivery created successfully.", 
            babyRecord,
            deliveryRecord 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.updateDeliveryRecord = async (req, res) => {

    const {
        ResidentId,
        DeliveryRecordId
    } = req.params;
    const {
        Firstname,
        Middlename,
        Lastname,
        Suffix,
        DeliveryDate,
        DeliveryPlace,
        DeliveryType,
        BirthWeight,
        BirthLength,
        AgparScore
    } = req.body;
  
    try {
        const residentRecord = await Resident.findByPk(ResidentId);
        if (!residentRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const deliveryRecord = await HealthDelivery.findByPk(DeliveryRecordId);
        if (!deliveryRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await Resident.update({ 
            Firstname,
            Middlename,
            Lastname,
            Suffix,
         });
         await HealthDelivery.update({ 
            DeliveryDate,
            DeliveryPlace,
            DeliveryType,
            BirthWeight,
            BirthLength,
            AgparScore
         });
        res.status(200).json({ 
            message: "Record updated successfully.", 
            residentRecord,
            deliveryRecord
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.disableDeliveryRecord = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const deliveryRecord = await HealthDelivery.findByPk(Id);
        if (!deliveryRecord) {
           return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await deliveryRecord.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "Record disabled successfully.", 
            deliveryRecord 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.enableDeliveryRecord = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const deliveryRecord = await HealthDelivery.findByPk(Id);
        if (!deliveryRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await deliveryRecord.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "Record enabled successfully.", 
            deliveryRecord 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.getAllPostnatalRecords = async (req, res) => {
    const {
        id
    } = req.query;
    try {
        const postnatalRecords = await HealthPostnatal.findAll({
            where: {
                MaternalRecordId: id
            },
            order: [['createdAt', 'DESC']]
        });
        res.json(postnatalRecords);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.createPostnatalRecord = async (req, res) => {
    const {
        MaternalRecordId,
        Purpose
    } = req.body;
    try {
        const postnatalRecord = await HealthPostnatal.create({
            MaternalRecordId,
            Purpose
        });
        res.status(201).json({ 
            message: "Postnatal consultation created successfully.", 
            postnatalRecord
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.updatePostnatalRecord = async (req, res) => {

    const {
        Id
    } = req.params;
    const {
        Purpose
    } = req.body;
  
    try {
        const postnatalRecord = await HealthPostnatal.findByPk(Id);
        if (!postnatalRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await postnatalRecord.update({ 
            Purpose
         });
        res.status(200).json({ 
            message: "Record updated successfully.", 
            postnatalRecord
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.disablePostnatalRecord = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const postnatalRecord = await HealthPostnatal.findByPk(Id);
        if (!postnatalRecord) {
           return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await postnatalRecord.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "Record disabled successfully.", 
            postnatalRecord 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.enablePostnatalRecord = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const postnatalRecord = await HealthPostnatal.findByPk(Id);
        if (!postnatalRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await postnatalRecord.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "Record enabled successfully.", 
            postnatalRecord 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.getAllDiseaseRecords = async (req, res) => {
    const {
        id
    } = req.query;
    try {
        const diseaseRecords = await HealthDisease.findAll({
            where: {
                ServiceAvailmentId: id
            },
            include: [
                {
                    model: Disease,
                    as: 'disease'
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(diseaseRecords);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.createDiseaseRecord = async (req, res) => {
    const {
        ServiceAvailmentId,
        DiseaseId,
        DiagnosisDate,
        OnsetDate,
        Status,
        Notes
    } = req.body;
    try {
        const diseaseRecord = await HealthDisease.create({
            ServiceAvailmentId,
            DiseaseId,
            DiagnosisDate,
            OnsetDate,
            Status,
            Notes
        })
        res.status(201).json({ 
            message: "Health disease created successfully.", 
            diseaseRecord
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.updateDiseaseRecord = async (req, res) => {

    const {
        Id
    } = req.params;
    const {
        DiseaseId,
        DiagnosisDate,
        OnsetDate,
        Status,
        Notes
    } = req.body;
  
    try {
        const diseaseRecord = await HealthDisease.findByPk(Id);
        if (!diseaseRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
         await diseaseRecord.update({ 
            DiseaseId,
            DiagnosisDate,
            OnsetDate,
            Status,
            Notes
         });
        res.status(200).json({ 
            message: "Record updated successfully.", 
            diseaseRecord
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.disableDiseaseRecord = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const diseaseRecord = await HealthDisease.findByPk(Id);
        if (!diseaseRecord) {
           return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await diseaseRecord.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "Record disabled successfully.", 
            diseaseRecord 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.enableDiseaseRecord = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const diseaseRecord = await HealthDisease.findByPk(Id);
        if (!diseaseRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await diseaseRecord.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "Record enabled successfully.", 
            diseaseRecord 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.getAllIllnessRecords = async (req, res) => {
    const {
        id
    } = req.query;
    try {
        const illnessRecord = await HealthIllness.findAll({
            where: {
                ServiceAvailmentId: id
            },
            include: [
                {
                    model: Illness,
                    as: 'illness'
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(illnessRecord);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.createIllnessRecord = async (req, res) => {
    const {
        ServiceAvailmentId,
        IllnessId,
        Notes
    } = req.body;
    try {
        const illnessRecord = await HealthIllness.create({
            ServiceAvailmentId,
            IllnessId,
            Notes
        })
        res.status(201).json({ 
            message: "Health illness created successfully.", 
            illnessRecord
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.updateIllnessRecord = async (req, res) => {

    const {
        Id
    } = req.params;
    const {
        IllnessId,
        Notes
    } = req.body;
  
    try {
        const illnessRecord = await HealthIllness.findByPk(Id);
        if (!illnessRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
         await illnessRecord.update({ 
            IllnessId,
            Notes
         });
        res.status(200).json({ 
            message: "Record updated successfully.", 
            illnessRecord
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.disableIllnessRecord = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const illnessRecord = await HealthIllness.findByPk(Id);
        if (!illnessRecord) {
           return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await illnessRecord.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "Record disabled successfully.", 
            illnessRecord 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.enableIllnessRecord = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const illnessRecord = await HealthIllness.findByPk(Id);
        if (!illnessRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await illnessRecord.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "Record enabled successfully.", 
            illnessRecord 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.getAllInterventionRecords = async (req, res) => {
    const {
        id
    } = req.query;
    try {
        const interventionRecords = await HealthIntervention.findAll({
            where: {
                ServiceAvailmentId: id
            },
            include: [
                {
                    model: Medication,
                    as: 'medication'
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(interventionRecords);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.createInterventionRecord = async (req, res) => {
    const {
        ServiceAvailmentId,
        Type,
        MedicationId,
        Dosage,
        Frequency,
        StartDate,
        EndDate,
        Notes
    } = req.body;
    try {
        const interventionRecord = await HealthIntervention.create({
            ServiceAvailmentId,
            Type,
            MedicationId,
            Dosage,
            Frequency,
            StartDate,
            EndDate,
            Notes
        })
        res.status(201).json({ 
            message: "Health intervention created successfully.", 
            interventionRecord
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.updateInterventionRecord = async (req, res) => {

    const {
        Id
    } = req.params;
    const {
        Type,
        MedicationId,
        Dosage,
        Frequency,
        StartDate,
        EndDate,
        Notes
    } = req.body;
  
    try {
        const interventionRecord = await HealthIntervention.findByPk(Id);
        if (!interventionRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
         await interventionRecord.update({ 
            Type,
            MedicationId,
            Dosage,
            Frequency,
            StartDate,
            EndDate,
            Notes
         });
        res.status(200).json({ 
            message: "Record updated successfully.", 
            interventionRecord
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.disableInterventionRecord = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const interventionRecord = await HealthIntervention.findByPk(Id);
        if (!interventionRecord) {
           return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await interventionRecord.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "Record disabled successfully.", 
            interventionRecord 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.enableInterventionRecord = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const interventionRecord = await HealthIntervention.findByPk(Id);
        if (!interventionRecord) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "No record found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        await interventionRecord.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "Record enabled successfully.", 
            interventionRecord 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};