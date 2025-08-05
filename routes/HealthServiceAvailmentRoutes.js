const express = require('express');
const router = express.Router();

const { 
    GetAllServiceAvailments, 
    GetAllHealthRecords,
    CreateHealthRecord,
    UpdateHealthRecord,
    DisableHealthRecord,
    EnableHealthRecord,
    GetAllMaternalRecords,
    CreateMaternalRecord,
    UpdateMaternalRecord,
    DisableMaternalRecord,
    EnableMaternalRecord,
    GetAllImmunizationRecords,
    CreateImmunizationRecord,
    UpdateImmunizationRecord,
    DisableImmunizationRecord,
    EnableImmunizationRecord,
    GetAllPrenatalRecords,
    CreatePrenatalRecord,
    UpdatePrenatalRecord,
    DisablePrenatalRecord,
    EnablePrenatalRecord,
    GetAllDeliveryRecords,
    CreateDeliveryRecord,
    UpdateDeliveryRecord,
    DisableDeliveryRecord,
    EnableDeliveryRecord,
    GetAllPostnatalRecords,
    CreatePostnatalRecord,
    UpdatePostnatalRecord,
    DisablePostnatalRecord,
    EnablePostnatalRecord,
    GetAllDiseaseRecords,
    CreateDiseaseRecord,
    UpdateDiseaseRecord,
    DisableDiseaseRecord,
    EnableDiseaseRecord,
    GetAllIllnessRecords,
    CreateIllnessRecord,
    UpdateIllnessRecord,
    DisableIllnessRecord,
    EnableIllnessRecord,
    GetAllInterventionRecords,
    CreateInterventionRecord,
    UpdateInterventionRecord,
    DisableInterventionRecord,
    EnableInterventionRecord
} = require('../controllers/HealthServiceAvailmentController');

router.get('/service', GetAllServiceAvailments);

router.get('/record', GetAllHealthRecords);
router.post('/record', CreateHealthRecord);
router.post('/record/:Id/update', UpdateHealthRecord);
router.post('/record/:Id/disable', DisableHealthRecord);
router.post('/record/:Id/enable', EnableHealthRecord);

router.get('/maternal/record', GetAllMaternalRecords);
router.post('/maternal/record', CreateMaternalRecord);
router.post('/maternal/record/:Id/update', UpdateMaternalRecord);
router.post('/maternal/record/:Id/disable', DisableMaternalRecord);
router.post('/maternal/record/:Id/enable', EnableMaternalRecord);

router.get('/immunization/record', GetAllImmunizationRecords);
router.post('/immunization/record', CreateImmunizationRecord);
router.post('/immunization/record/:Id/update', UpdateImmunizationRecord);
router.post('/immunization/record/:Id/disable', DisableImmunizationRecord);
router.post('/immunization/record/:Id/enable', EnableImmunizationRecord);

router.get('/prenatal/record', GetAllPrenatalRecords);
router.post('/prenatal/record', CreatePrenatalRecord);
router.post('/prenatal/record/:Id/update', UpdatePrenatalRecord);
router.post('/prenatal/record/:Id/disable', DisablePrenatalRecord);
router.post('/prenatal/record/:Id/enable', EnablePrenatalRecord);

router.get('/delivery/record', GetAllDeliveryRecords);
router.post('/delivery/record', CreateDeliveryRecord);
router.post('/delivery/record/:Id/update', UpdateDeliveryRecord);
router.post('/delivery/record/:Id/disable', DisableDeliveryRecord);
router.post('/delivery/record/:Id/enable', EnableDeliveryRecord);

router.get('/postnatal/record', GetAllPostnatalRecords);
router.post('/postnatal/record', CreatePostnatalRecord);
router.post('/postnatal/record/:Id/update', UpdatePostnatalRecord);
router.post('/postnatal/record/:Id/disable', DisablePostnatalRecord);
router.post('/postnatal/record/:Id/enable', EnablePostnatalRecord);

router.get('/disease/record', GetAllDiseaseRecords);
router.post('/disease/record', CreateDiseaseRecord);
router.post('/disease/record/:Id/update', UpdateDiseaseRecord);
router.post('/disease/record/:Id/disable', DisableDiseaseRecord);
router.post('/disease/record/:Id/enable', EnableDiseaseRecord);

router.get('/illness/record', GetAllIllnessRecords);
router.post('/illness/record', CreateIllnessRecord);
router.post('/illness/record/:Id/update', UpdateIllnessRecord);
router.post('/illness/record/:Id/disable', DisableIllnessRecord);
router.post('/illness/record/:Id/enable', EnableIllnessRecord);

router.get('/intervention/record', GetAllInterventionRecords);
router.post('/intervention/record', CreateInterventionRecord);
router.post('/intervention/record/:Id/update', UpdateInterventionRecord);
router.post('/intervention/record/:Id/disable', DisableInterventionRecord);
router.post('/intervention/record/:Id/enable', EnableInterventionRecord);


// router.post('/prenatal', createPrenatal);
// router.post('/:id/disable', disableHealthRecord);
// router.post('/:id/enable', enableHealthRecord);

module.exports = router;