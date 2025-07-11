const express = require('express');
const router = express.Router();

const { getAllBusinessTypes, getBusinessType, createBusinessType, updateBusinessType, disableBusinessType,enableBusinessType } = require('../controllers/BusinessTypeController');

router.get('/', getAllBusinessTypes);
router.get('/option', getBusinessType);
router.post('/', createBusinessType);
router.post('/:id/update', updateBusinessType);
router.post('/:id/disable', disableBusinessType);
router.post('/:id/enable', enableBusinessType);

module.exports = router;