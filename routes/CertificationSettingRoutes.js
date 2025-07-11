const express = require('express');
const router = express.Router();

const { getAllCertificatioSettings, getCertificationSetting, createCertificationSetting, updateCertificationSetting, disableCertificationSetting, enableCertificationSetting } = require('../controllers/CertificationSettingController');

router.get('/', getAllCertificatioSettings);
router.get('/option', getCertificationSetting);
router.post('/', createCertificationSetting);
router.post('/:id/update', updateCertificationSetting);
router.post('/:id/disable', disableCertificationSetting);
router.post('/:id/enable', enableCertificationSetting);

module.exports = router;