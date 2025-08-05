const express = require('express');
const router = express.Router();

const { 
    GetAllBloodTypes, 
    GetBloodType,
    CreateBloodType,
    UpdateBloodType,
    DisableBloodType,
    EnableBloodType
} = require('../controllers/BloodTypeController');

router.get('/', GetAllBloodTypes);
router.get('/option', GetBloodType);
router.post('/', CreateBloodType);
router.post('/:id/update', UpdateBloodType);
router.post('/:id/disable', DisableBloodType);
router.post('/:id/enable', EnableBloodType);

module.exports = router;