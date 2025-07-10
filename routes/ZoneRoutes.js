const express = require('express');
const router = express.Router();

const { getAllZones, getZone, createZone, updateZone, disableZone, enableZone } = require('../controllers/ZoneController');

router.get('/', getAllZones);
router.get('/option', getZone);
router.post('/', createZone);
router.post('/:id/update', updateZone);
router.post('/:id/disable', disableZone);
router.post('/:id/enable', enableZone);

module.exports = router;