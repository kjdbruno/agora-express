const express = require('express');
const router = express.Router();

const { 
    GetAllEducationalAttainments, 
    GetEducationalAttainment,
    CreateEducationalAttainment,
    UpdateEducationalAttainment,
    DisableEducationalAttainment,
    EnableEducationalAttainment
} = require('../controllers/EducationalAttainmentController');

router.get('/', GetAllEducationalAttainments);
router.get('/option', GetEducationalAttainment);
router.post('/', CreateEducationalAttainment);
router.post('/:id/update', UpdateEducationalAttainment);
router.post('/:id/disable', DisableEducationalAttainment);
router.post('/:id/enable', EnableEducationalAttainment);

module.exports = router;