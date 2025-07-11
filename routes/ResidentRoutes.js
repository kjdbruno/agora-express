const express = require('express');
const router = express.Router();

const { getAllResidents, createResident, updateResident, disableResident, enableResident } = require('../controllers/ResidentController');

router.get('/', getAllResidents);
router.post('/', createResident);
router.post('/:id/update', updateResident);
router.post('/:id/disable', disableResident);
router.post('/:id/enable', enableResident);

module.exports = router;