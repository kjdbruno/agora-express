const express = require('express');
const router = express.Router();

const { 
    GetAllCivilStatuses, 
    GetCivilStatus,
    CreateCivilStatus,
    UpdateCivilStatus,
    DisableCivilStatus,
    EnableCivilStatus
} = require('../controllers/CivilStatusController');

router.get('/', GetAllCivilStatuses);
router.get('/option', GetCivilStatus);
router.post('/', CreateCivilStatus);
router.post('/:id/update', UpdateCivilStatus);
router.post('/:id/disable', DisableCivilStatus);
router.post('/:id/enable', EnableCivilStatus);

module.exports = router;