const express = require('express');
const router = express.Router();

const { 
    getAllResidents, 
    createResident, 
    updateResident, 
    disableResident, 
    enableResident 
} = require('../controllers/ResidentController');

const { 
    getAllHouseholds, 
    getHousehold, 
    getAllFamilies, 
    getFamily,
    getAllHouseholdMembers,
    getAllFamilyMembers,
    createHousehold,
    createHouseholdMember,
    createFamily,
    createFamilyMember,
    disableHousehold,
    enableHousehold,
    disableFamily,
    enableFamily,
    disableFamilyMember,
    enableFamilyMember,
    disableHouseholdMember,
    enableHouseholdMember
} = require('../controllers/HouseholdController');

router.get('/', getAllResidents);
router.post('/', createResident);
router.post('/:id/update', updateResident);
router.post('/:id/disable', disableResident);
router.post('/:id/enable', enableResident);

router.get('/household', getAllHouseholds);
router.get('/household/option', getHousehold);
router.post('/household', createHousehold);
router.post('/household/:id/disable', disableHousehold);
router.post('/household/:id/enable', enableHousehold);

router.get('/household/member', getAllHouseholdMembers);
router.post('/household/member', createHouseholdMember);
router.post('/household/member/:id/disable', disableHouseholdMember);
router.post('/household/member/:id/enable', enableHouseholdMember);

router.get('/family', getAllFamilies);
router.get('/family/option', getFamily);
router.post('/family', createFamily);
router.post('/family/:id/disable', disableFamily);
router.post('/family/:id/enable', enableFamily);

router.get('/family/member', getAllFamilyMembers);
router.post('/family/member', createFamilyMember);
router.post('/family/member/:id/disable', disableFamilyMember);
router.post('/family/member/:id/enable', enableFamilyMember);

module.exports = router;