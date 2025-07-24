const express = require('express');
const router = express.Router();

const {
    getAllServiceAvailments,
    createConsultation,
    createPrenatal
} = require('../controllers/HealthServiceAvailmentController');

router.get('/', getAllServiceAvailments);
// router.post('/consultation', createConsultation);
// router.post('/prenatal', createPrenatal);
// router.post('/:id/disable', disableHealthRecord);
// router.post('/:id/enable', enableHealthRecord);

module.exports = router;