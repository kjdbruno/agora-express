const express = require('express');
const router = express.Router();

const { 
    getAllVaccines,
    getVaccine,
    createVaccine,
    updateVaccine,
    disableVaccine,
    enableVaccine
} = require('../controllers/VaccineController');

router.get('/', getAllVaccines);
router.get('/option', getVaccine);
router.post('/', createVaccine);
router.post('/:id/update', updateVaccine);
router.post('/:id/disable', disableVaccine);
router.post('/:id/enable', enableVaccine);

module.exports = router;