const { Op } = require("sequelize");
const { Resident, ResidentInformation, ResidentCategory, ResidentPhoto, Sex, Zone, Religion, CivilStatus, BloodType, EducationalAttainment, Occupation, Nationality } = require('../models');

exports.GetAllResidents = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await ResidentInformation.findAndCountAll({
            include: [
                {
                    model: Resident,
                    as: 'resident',
                    where: {
                        IsResident: true
                    },
                    attributes: ['Firstname', 'Middlename', 'Lastname', 'Suffix']
                },
                {
                    model: ResidentCategory,
                    as: 'residentCategory',
                    attributes: ['Name']
                },
                {
                    model: Zone,
                    as: 'zone',
                    attributes: ['Name']
                },
                {
                    model: Sex,
                    as: 'sex',
                    attributes: ['Name']
                },
                {
                    model: Religion,
                    as: 'religion',
                    attributes: ['Name']
                },
                {
                    model: CivilStatus,
                    as: 'civilStatus',
                    attributes: ['Name']
                },
                {
                    model: BloodType,
                    as: 'bloodType',
                    attributes: ['Name']
                },
                {
                    model: EducationalAttainment,
                    as: 'educationalAttainment',
                    attributes: ['Name']
                },
                {
                    model: Occupation,
                    as: 'occupation',
                    attributes: ['Name']
                },
                {
                    model: Nationality,
                    as: 'nationality',
                    attributes: ['Name']
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

exports.CreateResident = async (req, res) => {
    const { 
        Firstname, 
        Middlename, 
        Lastname, 
        Suffix, 
        ResidentCategoryId, 
        ZoneId, 
        SexId, 
        ReligionId, 
        CivilStatusId, 
        BloodTypeId, 
        EducationalAttainmentId, 
        OccupationId, 
        NationalityId,
        Birthdate,
        Income,
        ContactNo,
        Email,
        PhilsysNo,
        PrecintNo,
        SSSNo,
        GSISNo,
        PagibigNo,
        Tin,
        PhilhealthNo,
        IsPWD,
        IsIndigent,
        is4Ps,
        isSoloParent,
        isDeceased,
    } = req.body;
    try {
        const residentExist = await Resident.findOne({
            where: { 
                Firstname, Lastname, Middlename, Suffix
            }
        });
        if (residentExist) {
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

        // create resident id number
        const category = await ResidentCategory.findByPk(ResidentCategoryId);
        const residentCategoryName = category.Alias;

        // get the last resident number
        const lastResident = await ResidentInformation.findOne({
            where: {
                ResidentCategoryId: ResidentCategoryId
            },
            order: [['ResidentNo', 'DESC']]
        });
        let residentNo;
        //if there is no last resident, start with 1
        if (!lastResident) {
            residentNo = `${residentCategoryName}-0001`;
        } else {
            const lastNo = parseInt(lastResident.ResidentNo.split('-')[1]);
            residentNo = `${residentCategoryName}-${String(lastNo + 1).padStart(4, '0')}`;
        }
        // create resident
        const resident = await Resident.create({
            Firstname,
            Middlename,
            Lastname,
            Suffix,
            IsResident: true
        });
        // create resident information
        const residentInfo = await ResidentInformation.create({
            ResidentId: resident.Id,
            ResidentNo: residentNo,
            ResidentCategoryId,
            ZoneId,
            SexId,
            ReligionId,
            CivilStatusId,
            BloodTypeId,
            EducationalAttainmentId,
            OccupationId,
            NationalityId,
            Birthdate,
            Income,
            ContactNo,
            Email,
            PhilsysNo,
            PrecintNo,
            SSSNo,
            GSISNo,
            PagibigNo,
            Tin,
            PhilhealthNo,
            IsPWD,
            IsIndigent,
            is4Ps,
            isSoloParent,
            isDeceased,
        });

        res.status(201).json({ 
            message: "record created.", 
            resident, 
            residentInfo 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.UpdateResident = async (req, res) => {

    const {
        Id
    } = req.params;
    const { 
        ResidentId,
        Firstname, 
        Middlename, 
        Lastname, 
        Suffix, 
        ResidentCategoryId, 
        ZoneId, 
        SexId, 
        ReligionId, 
        CivilStatusId, 
        BloodTypeId, 
        EducationalAttainmentId, 
        OccupationId, 
        NationalityId,
        Birthdate,
        Income,
        ContactNo,
        Email,
        PhilsysNo,
        PrecintNo,
        SSSNo,
        GSISNo,
        PagibigNo,
        Tin,
        PhilhealthNo,
        IsPWD,
        IsIndigent,
        is4Ps,
        isSoloParent,
        isDeceased,
    } = req.body;
  
    try {
        const resident = await Resident.findByPk(ResidentId);
        if (!resident) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Resident not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        const residentInfo = await ResidentInformation.findByPk(Id);
        if (!residentInfo) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Resident information not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        // update resident
        await resident.update({
            Firstname,
            Middlename,
            Lastname,
            Suffix,
        });
        // update resident information
        await residentInfo.update({
            ZoneId,
            SexId,
            ReligionId,
            CivilStatusId,
            BloodTypeId,
            EducationalAttainmentId,
            OccupationId,
            NationalityId,
            Birthdate,
            Income,
            ContactNo,
            Email,
            PhilsysNo,
            PrecintNo,
            SSSNo,
            GSISNo,
            PagibigNo,
            Tin,
            PhilhealthNo,
            IsPWD,
            IsIndigent,
            is4Ps,
            isSoloParent,
            isDeceased
        });

        res.status(200).json({ 
            message: "record modified.", 
            resident, 
            residentInfo 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.DisableResident = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const r = await ResidentInformation.findByPk(Id);
        if (!r) {
            return res.status(404).json({ 
                error: "record not found." 
            });
        }
        await r.update({ 
            IsActive: false 
        });

        //get resident
        const resident = await Resident.findByPk(r.ResidentId);
        //get resident information
        const residentInfo = await ResidentInformation.findByPk(Id);

        res.status(200).json({ 
            message: "record disabled.", 
            resident, 
            residentInfo 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnableResident = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {
        const r = await ResidentInformation.findByPk(Id);
        if (!r) {
            return res.status(404).json({ 
                error: "record not found." 
            });
        }
        await r.update({ 
            IsActive: true 
        });

        //get resident
        const resident = await Resident.findByPk(r.ResidentId);
        //get resident information
        const residentInfo = await ResidentInformation.findByPk(Id);

        res.status(200).json({ 
            message: "record enabled.", 
            resident, 
            residentInfo 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};