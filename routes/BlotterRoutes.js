const express = require('express');
const router = express.Router();

const { 
    getAllBlotters,
    createBlotter,
    updateBlotter,
    disableBlotter,
    enableBlotter
 } = require('../controllers/BlotterController');

 const multer = require('multer');
 const storage = multer.memoryStorage();
 const upload = multer({ storage });

router.get('/', getAllBlotters);
router.post('/', upload.array('files'), createBlotter);
router.post('/:id/update', upload.array('files'), updateBlotter);
router.post('/:id/disable', disableBlotter);
router.post('/:id/enable', enableBlotter);

module.exports = router;