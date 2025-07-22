const express = require('express');
const router = express.Router();

const { 
    getAllDiseases,
    getDisease,
    createDisease,
    updateDisease,
    disableDisease,
    enableDisease
} = require('../controllers/DiseaseController');

router.get('/', getAllDiseases);
router.get('/option', getDisease);
router.post('/', createDisease);
router.post('/:id/update', updateDisease);
router.post('/:id/disable', disableDisease);
router.post('/:id/enable', enableDisease);

module.exports = router;