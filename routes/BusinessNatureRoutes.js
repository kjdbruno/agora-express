const express = require('express');
const router = express.Router();

const { getAllBusinessNatures, getBusinessNature, createBusinessNature, updateBusinessNature, disableBusinessNature, enableBusinessNature } = require('../controllers/BusinessNatureController');

router.get('/', getAllBusinessNatures);
router.get('/option', getBusinessNature);
router.post('/', createBusinessNature);
router.post('/:id/update', updateBusinessNature);
router.post('/:id/disable', disableBusinessNature);
router.post('/:id/enable', enableBusinessNature);

module.exports = router;