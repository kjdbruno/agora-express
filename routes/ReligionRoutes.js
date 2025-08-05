const express = require('express');
const router = express.Router();

const { 
    GetAllReligions, 
    GetReligion,
    CreateReligion,
    UpdateReligion,
    DisableReligion,
    EnableReligion
} = require('../controllers/ReligionController');

router.get('/', GetAllReligions);
router.get('/option', GetReligion);
router.post('/', CreateReligion);
router.post('/:id/update', UpdateReligion);
router.post('/:id/disable', DisableReligion);
router.post('/:id/enable', EnableReligion);

module.exports = router;