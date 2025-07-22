const express = require('express');
const router = express.Router();

const { 
    getAllSymptoms,
    getSymptom,
    createSymptom,
    updateSymptom,
    disableSymptom,
    enableSymptom
} = require('../controllers/DiseaseSymptomController');

router.get('/', getAllSymptoms);
router.get('/option', getSymptom);
router.post('/', createSymptom);
router.post('/:id/update', updateSymptom);
router.post('/:id/disable', disableSymptom);
router.post('/:id/enable', enableSymptom);

module.exports = router;