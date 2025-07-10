const express = require('express');
const router = express.Router();

const { getAllOccupations, getOccupation, createOccupation, updateOccupation, disableOccupation, enableOccupation } = require('../controllers/OccupationController');

router.get('/', getAllOccupations);
router.get('/option', getOccupation);
router.post('/', createOccupation);
router.post('/:id/update', updateOccupation);
router.post('/:id/disable', disableOccupation);
router.post('/:id/enable', enableOccupation);

module.exports = router;