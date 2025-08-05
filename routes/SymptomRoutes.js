const express = require('express');
const router = express.Router();

const { 
    GetAllSymptoms, 
    GetSymptom,
    CreateSymptom,
    UpdateSymptom,
    DisableSymptom,
    EnableSymptom
} = require('../controllers/DiseaseSymptomController');

router.get('/', GetAllSymptoms);
router.get('/option', GetSymptom);
router.post('/', CreateSymptom);
router.post('/:id/update', UpdateSymptom);
router.post('/:id/disable', DisableSymptom);
router.post('/:id/enable', EnableSymptom);

module.exports = router;