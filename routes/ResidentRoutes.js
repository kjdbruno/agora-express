const express = require('express');
const router = express.Router();

const { 
    GetAllResidents, 
    CreateResident,
    UpdateResident,
    DisableResident,
    EnableResident
} = require('../controllers/ResidentController');

const { 
    GetAllHouseholds, 
    GetHousehold, 
    CreateHousehold,
    DisableHousehold,
    EnableHousehold,
    GetAllHouseholdMembers,
    CreateHouseholdMember,
    DisableHouseholdMember,
    EnableHouseholdMember,
    GetAllFamilies,
    GetFamily,
    CreateFamily,
    DisableFamily,
    EnableFamily,
    GetAllFamilyMembers,
    CreateFamilyMember,
    DisableFamilyMember,
    EnableFamilyMember
} = require('../controllers/HouseholdController');

router.get('/', GetAllResidents);
router.post('/', CreateResident);
router.post('/:id/update', UpdateResident);
router.post('/:id/disable', DisableResident);
router.post('/:id/enable', EnableResident);

router.get('/household', GetAllHouseholds);
router.get('/household/option', GetHousehold);
router.post('/household', CreateHousehold);
router.post('/household/:id/disable', DisableHousehold);
router.post('/household/:id/enable', EnableHousehold);

router.get('/household/member', GetAllHouseholdMembers);
router.post('/household/member', CreateHouseholdMember);
router.post('/household/member/:id/disable', DisableHouseholdMember);
router.post('/household/member/:id/enable', EnableHouseholdMember);

router.get('/family', GetAllFamilies);
router.get('/family/option', GetFamily);
router.post('/family', CreateFamily);
router.post('/family/:id/disable', DisableFamily);
router.post('/family/:id/enable', EnableFamily);

router.get('/family/member', GetAllFamilyMembers);
router.post('/family/member', CreateFamilyMember);
router.post('/family/member/:id/disable', DisableFamilyMember);
router.post('/family/member/:id/enable', EnableFamilyMember);

module.exports = router;