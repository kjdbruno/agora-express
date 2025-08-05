const express = require('express');
const router = express.Router();

const { 
    GetAllPositions, 
    GetPosition,
    CreatePosition,
    UpdatePosition,
    DisablePosition,
    EnablePosition
} = require('../controllers/PositionController');

router.get('/', GetAllPositions);
router.get('/option', GetPosition);
router.post('/', CreatePosition);
router.post('/:id/update', UpdatePosition);
router.post('/:id/disable', DisablePosition);
router.post('/:id/enable', EnablePosition);

module.exports = router;