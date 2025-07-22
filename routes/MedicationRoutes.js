const express = require('express');
const router = express.Router();

const {
    getAllMedications,
    getMedication,
    createMedication,
    updateMedication,
    disableMedication,
    enableMedication
} = require('../controllers/MedicationController');

router.get('/', getAllMedications);
router.get('/option', getMedication);
router.post('/', createMedication);
router.post('/:id/update', updateMedication);
router.post('/:id/disable', disableMedication);
router.post('/:id/enable', enableMedication);

module.exports = router;