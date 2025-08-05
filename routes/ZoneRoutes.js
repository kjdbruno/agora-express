const express = require('express');
const router = express.Router();

const { 
    GetAllZones,
    GetZone,
    CreateZone,
    UpdateZone,
    DisableZone,
    EnableZone
 } = require('../controllers/ZoneController');

router.get('/', GetAllZones);
router.get('/option', GetZone);
router.post('/', CreateZone);
router.post('/:id/update', UpdateZone);
router.post('/:id/disable', DisableZone);
router.post('/:id/enable', EnableZone);

module.exports = router;