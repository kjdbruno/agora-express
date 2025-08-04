const { Op } = require("sequelize");
const { Household, HouseholdMember, Family, FamilyMember, Resident } = require('../models');

exports.GetAllHouseholds = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await Household.findAndCountAll({
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

exports.GetHousehold = async (req, res) => {
    try {
        const households = await Household.findAll({
            where: {
                IsActive: true
            }
        });
        res.json(households);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.GetAllFamilies = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await Family.findAndCountAll({
            include: [
                {
                    model: FamilyMember,
                    as: 'familyMembers',
                    attributes: ['Id', 'ResidentId', 'RelationshipId', 'IsHead'],
                    include: [
                        {
                            model: Resident,
                            as: 'resident',
                            attributes: ['Id', 'Firstname', 'Middlename', 'Lastname', 'Suffix']
                        }
                    ]
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

exports.GetFamily = async (req, res) => {
    try {
        const families = await Family.findAll({
            where: {
                IsActive: true
            },
            include: [
                {
                    model: FamilyMember,
                    as: 'familyMembers',
                    attributes: ['Id', 'ResidentId', 'RelationshipId', 'IsHead'],
                    include: [
                        {
                            model: Resident,
                            as: 'resident',
                            attributes: ['Id', 'Firstname', 'Middlename', 'Lastname', 'Suffix']
                        }
                    ]
                }
            ]
        });
        res.json(families);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.GetAllHouseholdMembers = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await HouseholdMember.findAndCountAll({
            where: {
                IsActive: true
            },
            include: [
                {
                    model: Household,
                    as: 'household',
                    attributes: ['Id', 'Code']
                },
                {
                    model: Family,
                    as: 'family',
                    attributes: ['Id', 'Code'],
                    include: [
                        {
                            model: FamilyMember,
                            as: 'familyMembers',
                            attributes: ['Id', 'ResidentId', 'RelationshipId', 'IsHead'],
                            include: [
                                {
                                    model: Resident,
                                    as: 'resident',
                                    attributes: ['Id', 'Firstname', 'Middlename', 'Lastname', 'Suffix']
                                }
                            ]
                        }
                    ]
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

exports.GetAllFamilyMembers = async (req, res) => {
    const Page = parseInt(req.query.Page) || 1;
    const Limit = parseInt(req.query.Limit) || 10;
    const Offset = (Page - 1) * Limit;
    try {
        const { count, rows } = await FamilyMember.findAndCountAll({
            where: {
                IsActive: true
            },
            include: [
                {
                    model: Resident,
                    as: 'resident',
                    attributes: ['Id', 'Firstname', 'Middlename', 'Lastname', 'Suffix']
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

exports.CreateHousehold = async (req, res) => {
    try {
        // get the last household code
        const lastHousehold = await Household.findOne({
            order: [['Id', 'DESC']],
            attributes: ['Code']
        });
        let householdCode;
        if (!lastHousehold) {
            householdCode = `HH-00001`;
        } else {
            const lastNo = parseInt(lastHousehold.Code.split('-')[1]);
            householdCode = `HH-${String(lastNo + 1).padStart(5, '0')}`;
        }
        const household = await Household.create({ 
            Code: householdCode 
        });
        res.status(201).json({ 
            message: "record created.", 
            household 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.CreateFamily = async (req, res) => {
    try {
        // get the last family code
        const lastFamily = await Family.findOne({
            order: [['Id', 'DESC']],
            attributes: ['Code']
        });
        let familyCode;
        if (!lastFamily) {
            familyCode = `FF-00001`;
        } else {
            const lastNo = parseInt(lastFamily.Code.split('-')[1]);
            familyCode = `FF-${String(lastNo + 1).padStart(5, '0')}`;
        }
        const family = await Family.create({ 
            Code: familyCode
         });
        res.status(201).json({ 
            message: "record created.", 
            family 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.CreateHouseholdMember = async (req, res) => {
    const {
        HouseholdId,
        FamilyId, 
        IsHead 
    } = req.body;
    try {
        const hmExist = await HouseholdMember.findOne({
            where: { 
                HouseholdId,
                FamilyId
            }
        });
        if (hmExist) {
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
        const hmAssigned = await HouseholdMember.findOne({
            where: {
                FamilyId, // check if this family already exists...
                HouseholdId: { [Op.ne]: HouseholdId } // ...in a different household
            }
        });
        if (hmAssigned) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record already assigned!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        
        const member = await HouseholdMember.create({ 
            HouseholdId, 
            FamilyId, 
            IsHead 
        });
        res.status(201).json({ 
            message: "record created.", 
            member 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.CreateFamilyMember = async (req, res) => {
    const { 
        FamilyId, 
        ResidentId, 
        RelationshipId, 
        IsHead 
    } = req.body;
    try {
        const fmExist = await FamilyMember.findOne({
            where: { 
                FamilyId,
                ResidentId
            }
        });
        if (fmExist) {
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
        const fmAssigned = await FamilyMember.findOne({
            where: {
                ResidentId,
                FamilyId: { [Op.ne]: FamilyId }, // different household
            }
        });
        if (fmAssigned) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record already assigned!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        
        const member = await FamilyMember.create({ 
            FamilyId, 
            ResidentId, 
            RelationshipId, 
            IsHead 
        });
        res.status(201).json({ 
            message: "record created.", 
            member 
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message 
        });
    }
};

exports.DisableHousehold = async (req, res) => {

    const { 
        Id
    } = req.params;
  
    try {
        const household = await Household.findByPk(Id);
        if (!household) {
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
        await household.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "record disabled.", 
            household 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnableHousehold = async (req, res) => {

    const { 
        Id
    } = req.params;
  
    try {
        const household = await Household.findByPk(Id);
        if (!household) {
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
        await household.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "record enabled.", 
            household 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.DisableHouseholdMember = async (req, res) => {

    const { 
        Id
    } = req.params;
  
    try {
        const member = await HouseholdMember.findByPk(Id);
        if (!member) {
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
        await member.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "record disbaled.", 
            member 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnableHouseholdMember = async (req, res) => {

    const { 
        Id
    } = req.params;
  
    try {
        const member = await HouseholdMember.findByPk(Id);
        if (!member) {
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
        await member.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "record enabled.", 
            member 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.DisableFamily = async (req, res) => {

    const { 
        Id
    } = req.params;
  
    try {
        const family = await Family.findByPk(Id);
        if (!family) {
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
        await family.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "record disabled.", 
            family 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnableFamily = async (req, res) => {

    const { 
        Id
    } = req.params;
  
    try {
        const family = await Family.findByPk(Id);
        if (!family) {
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
        await family.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "record enabled.", 
            family 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.DisableFamilyMember = async (req, res) => {

    const { 
        Id
    } = req.params;
  
    try {
        const member = await FamilyMember.findByPk(Id);
        if (!member) {
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
        await member.update({ 
            IsActive: false 
        });
        res.status(200).json({ 
            message: "record disabled.", 
            member 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.EnableFamilyMember = async (req, res) => {

    const { 
        Id
    } = req.params;
  
    try {
        const member = await FamilyMember.findByPk(Id);
        if (!member) {
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
        await member.update({ 
            IsActive: true 
        });
        res.status(200).json({ 
            message: "record enabled.", 
            member 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};