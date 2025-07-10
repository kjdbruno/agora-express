const express = require('express');
const router = express.Router();

const { getAllSexes, getSex, createSex, updateSex, disableSex, enableSex } = require('../controllers/SexController');

router.get('/', getAllSexes);
router.get('/option', getSex);
router.post('/', createSex);
router.post('/:id/update', updateSex);
router.post('/:id/disable', disableSex);
router.post('/:id/enable', enableSex);

module.exports = router;