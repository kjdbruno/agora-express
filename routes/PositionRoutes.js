const express = require('express');
const router = express.Router();

const { getAllPositions, getPosition, createPosition, updatePosition, disablePosition, enablePosition } = require('../controllers/PositionController');

router.get('/', getAllPositions);
router.get('/option', getPosition);
router.post('/', createPosition);
router.post('/:id/update', updatePosition);
router.post('/:id/disable', disablePosition);
router.post('/:id/enable', enablePosition);

module.exports = router;