const express = require('express');
const router = express.Router();

const { 
    GetAllSexes, 
    GetSex,
    CreateSex,
    UpdateSex,
    DisableSex,
    EnableSex
} = require('../controllers/SexController');

router.get('/', GetAllSexes);
router.get('/option', GetSex);
router.post('/', CreateSex);
router.post('/:id/update', UpdateSex);
router.post('/:id/disable', DisableSex);
router.post('/:id/enable', EnableSex);

module.exports = router;