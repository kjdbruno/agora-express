const express = require('express');
const router = express.Router();

const { getAllCivilStatuses, getCivilStatus, createCivilStatus, updateCivilStatus, disableCivilStatus, enableCivilStatus } = require('../controllers/CivilStatusController');

router.get('/', getAllCivilStatuses);
router.get('/option', getCivilStatus);
router.post('/', createCivilStatus);
router.post('/:id/update', updateCivilStatus);
router.post('/:id/disable', disableCivilStatus);
router.post('/:id/enable', enableCivilStatus);

module.exports = router;