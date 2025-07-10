const express = require('express');
const router = express.Router();

const { getAllNationalities, getNationality, createNationality, updateNationality, disableNationality, enableNationality } = require('../controllers/NationalityController');

router.get('/', getAllNationalities);
router.get('/option', getNationality);
router.post('/', createNationality);
router.post('/:id/update', updateNationality);
router.post('/:id/disable', disableNationality);
router.post('/:id/enable', enableNationality);

module.exports = router;