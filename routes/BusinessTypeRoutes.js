const express = require('express');
const router = express.Router();

const { 
    GetAllBusinessTypes,
    GetBusinessType,
    CreateBusinessType,
    UpdateBusinessType,
    DisableBusinessType,
    EnableBusinessType
} = require('../controllers/BusinessTypeController');

router.get('/', GetAllBusinessTypes);
router.get('/option', GetBusinessType);
router.post('/', CreateBusinessType);
router.post('/:id/update', UpdateBusinessType);
router.post('/:id/disable', DisableBusinessType);
router.post('/:id/enable', EnableBusinessType);

module.exports = router;