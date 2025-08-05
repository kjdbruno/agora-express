const express = require('express');
const router = express.Router();

const { 
    GetAllVaccines, 
    GetVaccine,
    CreateVaccine,
    UpdateVaccine,
    DisableVaccine,
    EnableVaccine
} = require('../controllers/VaccineController');

router.get('/', GetAllVaccines);
router.get('/option', GetVaccine);
router.post('/', CreateVaccine);
router.post('/:id/update', UpdateVaccine);
router.post('/:id/disable', DisableVaccine);
router.post('/:id/enable', EnableVaccine);

module.exports = router;