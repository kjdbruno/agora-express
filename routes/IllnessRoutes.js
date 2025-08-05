const express = require('express');
const router = express.Router();

const { 
    GetAllIllnesses, 
    GetIllness,
    CreateIllness,
    UpdateIllness,
    DisableIllness,
    EnableIllness
} = require('../controllers/IllnessController');

router.get('/', GetAllIllnesses);
router.get('/option', GetIllness);
router.post('/', CreateIllness);
router.post('/:id/update', UpdateIllness);
router.post('/:id/disable', DisableIllness);
router.post('/:id/enable', EnableIllness);

module.exports = router;