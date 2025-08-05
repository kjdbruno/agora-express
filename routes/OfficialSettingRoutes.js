const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { 
    GetAllOfficialSetting, 
    CreateOfficialSetting,
    UpdateOfficialSetting,
    DisableOfficialSetting,
    EnableOfficialSetting
} = require('../controllers/OfficialSettingController');

router.get('/', GetAllOfficialSetting);
router.post('/', upload.single('file'), CreateOfficialSetting);
router.post('/:id/update', upload.single('file'), UpdateOfficialSetting);
router.post('/:id/disable', DisableOfficialSetting);
router.post('/:id/enable', EnableOfficialSetting);

module.exports = router;