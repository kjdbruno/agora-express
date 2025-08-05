const express = require('express');
const router = express.Router();

const { 
    GetAllMedications, 
    GetMedication,
    CreateMedication,
    UpdateMedication,
    DisableMedication,
    EnableMedication
} = require('../controllers/MedicationController');

router.get('/', GetAllMedications);
router.get('/option', GetMedication);
router.post('/', CreateMedication);
router.post('/:id/update', UpdateMedication);
router.post('/:id/disable', DisableMedication);
router.post('/:id/enable', EnableMedication);

module.exports = router;