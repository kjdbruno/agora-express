const express = require('express');
const router = express.Router();

const { 
    GetAllNationalities,
    GetNationality,
    CreateNationality,
    UpdateNationality,
    DisableNationality,
    EnableNationality
 } = require('../controllers/NationalityController');

router.get('/', GetAllNationalities);
router.get('/option', GetNationality);
router.post('/', CreateNationality);
router.post('/:id/update', UpdateNationality);
router.post('/:id/disable', DisableNationality);
router.post('/:id/enable', EnableNationality);

module.exports = router;