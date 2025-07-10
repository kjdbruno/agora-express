const express = require('express');
const router = express.Router();

const { getAllResidents } = require('../controllers/ResidentController');

router.get('/', getAllResidents);

module.exports = router;