const express = require('express');
const router = express.Router();

const { 
    GetAllDiseases, 
    GetDisease,
    CreateDisease,
    UpdateDisease,
    DisableDisease,
    EnableDisease
} = require('../controllers/DiseaseController');

router.get('/', GetAllDiseases);
router.get('/option', GetDisease);
router.post('/', CreateDisease);
router.post('/:id/update', UpdateDisease);
router.post('/:id/disable', DisableDisease);
router.post('/:id/enable', EnableDisease);

module.exports = router;