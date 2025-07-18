const { Op } = require("sequelize");
const { Household, HouseholdMember, Family, HouseholdMember } = require('../models');
const familymember = require("../models/familymember");

exports.getAllHouseholds = async (req, res) => {
    try {
        const households = await Household.findAll();
        res.json(households);
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
            householdCode = `HH-0001`;
        } else {
            const lastNo = parseInt(lastHousehold.Code.split('-')[1]);
            householdCode = `HH-${String(lastNo + 1).padStart(4, '0')}`;
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
            familyCode = `FF-0001`;
        } else {
            const lastNo = parseInt(lastFamily.Code.split('-')[1]);
            familyCode = `FF-${String(lastNo + 1).padStart(4, '0')}`;
        }
        const family = await Family.create({ Code: familyCode });
        res.status(201).json({ message: "Family created successfully.", family });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createHouseholdMember = async (req, res) => {
    const { HouseholdId, FamilyId } = req.body;
    try {
        const hmExist = await HouseholdMember.findOne({
            where: { 
                [Op.or]: [{ HouseholdId }, { FamilyId }] 
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
        
        const member = await HouseholdMember.create({ HouseholdId, FamilyId });
        res.status(201).json({ message: "Member created successfully.", member });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createFamilyMember = async (req, res) => {
    const { FamilyId, ResidentId, RelationshipId, IsHead } = req.body;
    try {
        const hmExist = await HouseholdMember.findOne({
            where: { 
                [Op.or]: [{ HouseholdId }, { FamilyId }] 
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
        
        const member = await HouseholdMember.create({ HouseholdId, FamilyId });
        res.status(201).json({ message: "Member created successfully.", member });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.disableSex = async (req, res) => {

    const { id } = req.params;
  
    try {
        const sex = await Sex.findByPk(id);
        if (!sex) {
            return res.status(404).json({ error: "Sex not found." });
        }
        await sex.update({ IsActive: false });
        res.status(200).json({ message: "Sex disabled successfully.", sex });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.enableSex = async (req, res) => {

    const { id } = req.params;
  
    try {
        const sex = await Sex.findByPk(id);
        if (!sex) {
            return res.status(404).json({ error: "Sex not found." });
        }
        await sex.update({ IsActive: true });
        res.status(200).json({ message: "Sex enabled successfully.", sex });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};