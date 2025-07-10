const express = require('express');
const router = express.Router();

const { getAllEducationalAttainments, getEducationalAttainment, createEducationalAttainment, updateEducationalAttainment, disableEducationalAttainment, enableEducationalAttainment } = require('../controllers/EducationalAttainmentController');

router.get('/', getAllEducationalAttainments);
router.get('/option', getEducationalAttainment);
router.post('/', createEducationalAttainment);
router.post('/:id/update', updateEducationalAttainment);
router.post('/:id/disable', disableEducationalAttainment);
router.post('/:id/enable', enableEducationalAttainment);

module.exports = router;