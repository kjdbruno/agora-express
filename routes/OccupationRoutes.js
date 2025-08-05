const express = require('express');
const router = express.Router();

const { 
    GetAllOccupations,
    GetOccupation,
    CreateOccupation,
    UpdateOccupation,
    DisableOccupation,
    EnableOccupation
 } = require('../controllers/OccupationController');

router.get('/', GetAllOccupations);
router.get('/option', GetOccupation);
router.post('/', CreateOccupation);
router.post('/:id/update', UpdateOccupation);
router.post('/:id/disable', DisableOccupation);
router.post('/:id/enable', EnableOccupation);

module.exports = router;