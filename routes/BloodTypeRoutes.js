const express = require('express');
const router = express.Router();

const { getAllBloodTypes, getBloodType, createBloodType, updateBloodType, disableBloodType, enableBloodType } = require('../controllers/BloodTypeController');

router.get('/', getAllBloodTypes);
router.get('/option', getBloodType);
router.post('/', createBloodType);
router.post('/:id/update', updateBloodType);
router.post('/:id/disable', disableBloodType);
router.post('/:id/enable', enableBloodType);

module.exports = router;