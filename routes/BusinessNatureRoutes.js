const express = require('express');
const router = express.Router();

const { 
    GetAllBusinessNatures, 
    GetBusinessNature,
    CreateBusinessNature,
    UpdateBusinessNature,
    DisableBusinessNature,
    EnableBusinessNature
} = require('../controllers/BusinessNatureController');

router.get('/', GetAllBusinessNatures);
router.get('/option', GetBusinessNature);
router.post('/', CreateBusinessNature);
router.post('/:id/update', UpdateBusinessNature);
router.post('/:id/disable', DisableBusinessNature);
router.post('/:id/enable', EnableBusinessNature);

module.exports = router;