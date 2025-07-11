const express = require('express');
const router = express.Router();

const { getAllCertificationTypes, getCertificationType, createCertificationType, updateCertificationType, disableCertificationType, enableCertificationType } = require('../controllers/CertificationTypeController');

router.get('/', getAllCertificationTypes);
router.get('/option', getCertificationType);
router.post('/', createCertificationType);
router.post('/:id/update', updateCertificationType);
router.post('/:id/disable', disableCertificationType);
router.post('/:id/enable', enableCertificationType);

module.exports = router;