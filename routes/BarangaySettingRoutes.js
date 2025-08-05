const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { 
    GetAllBarangaySettings, 
    CreateBarangaySetting,
    UpdateBarangaySetting
} = require('../controllers/BarangaySettingController');

router.get('/', GetAllBarangaySettings);
router.post('/', upload.single('file'), CreateBarangaySetting);
router.post('/:id/update', upload.single('file'), UpdateBarangaySetting);

module.exports = router;