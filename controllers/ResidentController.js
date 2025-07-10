const { Op } = require("sequelize");
const { Resident, ResidentInformation, ResidentCategory, ResidentPhoto, Sex, Zone, Religion, CivilStatus, BloodType, EducationalAttainment, Occupation, Nationality } = require('../models');

exports.getAllResidents = async (req, res) => {
    try {
        const residents = await ResidentInformation.findAll({
            include: [
                {
                    model: Resident,
                    as: 'resident',
                    where: {
                        IsResident: true
                    },
                    attributes: ['Id', 'Firstname', 'Middlename', 'Lastname', 'Suffix']
                },
                {
                    model: ResidentCategory,
                    as: 'residentCategory',
                    attributes: ['Id', 'Name', 'Alias']
                },
                {
                    model: Zone,
                    as: 'zone',
                    attributes: ['Id', 'Name']
                },
                {
                    model: Sex,
                    as: 'sex',
                    attributes: ['Id', 'Name']
                },
                {
                    model: Religion,
                    as: 'religion',
                    attributes: ['Id', 'Name']
                },
                {
                    model: CivilStatus,
                    as: 'civilStatus',
                    attributes: ['Id', 'Name']
                },
                {
                    model: BloodType,
                    as: 'bloodType',
                    attributes: ['Id', 'Name']
                },
                {
                    model: EducationalAttainment,
                    as: 'educationalAttainment',
                    attributes: ['Id', 'Name']
                },
                {
                    model: Occupation,
                    as: 'occupation',
                    attributes: ['Id', 'Name']
                },
                {
                    model: Nationality,
                    as: 'nationality',
                    attributes: ['Id', 'Name']
                }
            ]
        });
        res.json(residents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createResident = async (req, res) => {
    const { 
        Firstname, 
        Middlename, 
        Lastname, 
        Suffix, 
        IsResident, 
        ResidentCategoryId, 
        ZoneId, 
        SexId, 
        ReligionId, 
        CivilStatusId, 
        BloodTypeId, 
        EducationalAttainmentId, 
        OccupationId, 
        NationalityId
     } = req.body;
    try {
        const residentExist = await Resident.findOne({
            where: { 
                [Op.or]: [{ Firstname, Lastname, Middlename, Suffix }] 
            }
        });
        if (residentExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "Resident already exists!",
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
        const residentInformation = await ResidentInformation.create({
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
            NationalityId
        });

        res.status(201).json({ message: "Resident created successfully.", sex });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};