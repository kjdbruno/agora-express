const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { getAllOfficialSetting, createOfficialSetting, updateOfficialSetting, disableOfficialSetting, enableOfficialSetting } = require('../controllers/OfficialSettingController');

router.get('/', getAllOfficialSetting);
router.post('/', upload.single('file'), createOfficialSetting);
router.post('/:id/update', upload.single('file'), updateOfficialSetting);
router.post('/:id/disable', disableOfficialSetting);
router.post('/:id/enable', enableOfficialSetting);

module.exports = router;