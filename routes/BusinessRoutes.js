const express = require('express');
const router = express.Router();

const { getAllBusinesses, getBusiness, createBusiness, updateBusiness, disableBusiness, enableBusiness } = require('../controllers/BusinessController');

router.get('/', getAllBusinesses);
router.get('/option', getBusiness);
router.post('/', createBusiness);
router.post('/:id/update', updateBusiness);
router.post('/:id/disable', disableBusiness);
router.post('/:id/enable', enableBusiness);

module.exports = router;