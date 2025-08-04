const { Op } = require("sequelize");
const { Household, HouseholdMember, Family, FamilyMember, Resident } = require('../models');

exports.getAllHouseholds = async (req, res) => {
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
        res.status(500).json({ error: error.message });
    }
};

exports.getHousehold = async (req, res) => {
    try {
        const households = await Household.findAll({
            where: {
                IsActive: true
            }
        });
        res.json(households);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllFamilies = async (req, res) => {
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
        res.status(500).json({ error: error.message });
    }
};

exports.getFamily = async (req, res) => {
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
        res.status(500).json({ error: error.message });
    }
};

exports.getAllHouseholdMembers = async (req, res) => {
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
        res.status(500).json({ error: error.message });
    }
};

exports.getAllFamilyMembers = async (req, res) => {
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
        res.status(500).json({ error: error.message });
    }
};

exports.createHousehold = async (req, res) => {
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
        const household = await Household.create({ Code: householdCode });
        res.status(201).json({ message: "Household created successfully.", household });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createFamily = async (req, res) => {
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
        const family = await Family.create({ Code: familyCode });
        res.status(201).json({ message: "Family created successfully.", family });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createHouseholdMember = async (req, res) => {
    const { HouseholdId, FamilyId, IsHead } = req.body;
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
                    msg: "Member already exists!",
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
                    msg: "Member already assigned!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        
        const member = await HouseholdMember.create({ HouseholdId, FamilyId, IsHead });
        res.status(201).json({ message: "Member created successfully.", member });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createFamilyMember = async (req, res) => {
    const { FamilyId, ResidentId, RelationshipId, IsHead } = req.body;
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
                    msg: "Member already exists!",
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
                    msg: "Member already assigned!",
                    path: "name",
                    location: "body",
                }],
            });
        }
        
        const member = await FamilyMember.create({ FamilyId, ResidentId, RelationshipId, IsHead });
        res.status(201).json({ message: "Member created successfully.", member });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.disableHousehold = async (req, res) => {

    const { id } = req.params;
  
    try {
        const household = await Household.findByPk(id);
        if (!household) {
            return res.status(404).json({ error: "household not found." });
        }
        await household.update({ IsActive: false });
        res.status(200).json({ message: "household disabled successfully.", household });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableHousehold = async (req, res) => {

    const { id } = req.params;
  
    try {
        const household = await Household.findByPk(id);
        if (!household) {
            return res.status(404).json({ error: "Household not found." });
        }
        await household.update({ IsActive: true });
        res.status(200).json({ message: "Household enabled successfully.", household });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableHouseholdMember = async (req, res) => {

    const { id } = req.params;
  
    try {
        const member = await HouseholdMember.findByPk(id);
        if (!member) {
            return res.status(404).json({ error: "Member not found." });
        }
        await member.update({ IsActive: false });
        res.status(200).json({ message: "Member disabled successfully.", member });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableHouseholdMember = async (req, res) => {

    const { id } = req.params;
  
    try {
        const member = await HouseholdMember.findByPk(id);
        if (!member) {
            return res.status(404).json({ error: "Member not found." });
        }
        await member.update({ IsActive: true });
        res.status(200).json({ message: "Member enabled successfully.", member });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableFamily = async (req, res) => {

    const { id } = req.params;
  
    try {
        const family = await Family.findByPk(id);
        if (!family) {
            return res.status(404).json({ error: "Family not found." });
        }
        await family.update({ IsActive: false });
        res.status(200).json({ message: "Family disabled successfully.", family });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableFamily = async (req, res) => {

    const { id } = req.params;
  
    try {
        const family = await Family.findByPk(id);
        if (!family) {
            return res.status(404).json({ error: "Family not found." });
        }
        await family.update({ IsActive: true });
        res.status(200).json({ message: "Family enabled successfully.", family });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.disableFamilyMember = async (req, res) => {

    const { id } = req.params;
  
    try {
        const member = await FamilyMember.findByPk(id);
        if (!member) {
            return res.status(404).json({ error: "Member not found." });
        }
        await member.update({ IsActive: false });
        res.status(200).json({ message: "Member disabled successfully.", member });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableFamilyMember = async (req, res) => {

    const { id } = req.params;
  
    try {
        const member = await FamilyMember.findByPk(id);
        if (!member) {
            return res.status(404).json({ error: "Member not found." });
        }
        await member.update({ IsActive: true });
        res.status(200).json({ message: "Member enabled successfully.", member });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};