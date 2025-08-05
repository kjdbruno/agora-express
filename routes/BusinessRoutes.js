const express = require('express');
const router = express.Router();

const { 
    GetAllBusinesses, 
    GetBusiness,
    CreateBusiness,
    UpdateBusiness,
    DisableBusiness,
    EnableBusiness
} = require('../controllers/BusinessController');

router.get('/', GetAllBusinesses);
router.get('/option', GetBusiness);
router.post('/', CreateBusiness);
router.post('/:id/update', UpdateBusiness);
router.post('/:id/disable', DisableBusiness);
router.post('/:id/enable', EnableBusiness);

module.exports = router;