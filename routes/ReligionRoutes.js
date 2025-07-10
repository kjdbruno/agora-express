const express = require('express');
const router = express.Router();

const { getAllReligions, getReligion, createReligion, updateReligion, disableReligion, enableReligion } = require('../controllers/ReligionController');

router.get('/', getAllReligions);
router.get('/option', getReligion);
router.post('/', createReligion);
router.post('/:id/update', updateReligion);
router.post('/:id/disable', disableReligion);
router.post('/:id/enable', enableReligion);

module.exports = router;