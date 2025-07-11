const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { getAllBarangaySettings, createBarangaySetting, updateBarangaySetting } = require('../controllers/BarangaySettingController');

router.get('/', getAllBarangaySettings);
router.post('/', upload.single('file'), createBarangaySetting);
router.post('/:id/update', upload.single('file'), updateBarangaySetting);

module.exports = router;