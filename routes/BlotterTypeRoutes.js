const express = require('express');
const router = express.Router();

const { 
    getAllBlotterTypes, 
    getBlotterType,
    createBlotterType,
    updateBlotterType,
    disableBlotterType,
    enableBlotterType
 } = require('../controllers/BlotterTypeController');

router.get('/', getAllBlotterTypes);
router.get('/option', getBlotterType);
router.post('/', createBlotterType);
router.post('/:id/update', updateBlotterType);
router.post('/:id/disable', disableBlotterType);
router.post('/:id/enable', enableBlotterType);

module.exports = router;