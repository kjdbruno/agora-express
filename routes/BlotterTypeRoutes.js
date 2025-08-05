const express = require('express');
const router = express.Router();

const { 
    GetAllBlotterTypes, 
    GetBlotterType,
    CreateBlotterType,
    UpdateBlotterType,
    DisableBlotterType,
    EnableBlotterType
} = require('../controllers/BlotterTypeController');

router.get('/', GetAllBlotterTypes);
router.get('/option', GetBlotterType);
router.post('/', CreateBlotterType);
router.post('/:id/update', UpdateBlotterType);
router.post('/:id/disable', DisableBlotterType);
router.post('/:id/enable', EnableBlotterType);

module.exports = router;