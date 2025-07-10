const express = require('express');
const router = express.Router();

const { getAllResidentCategories, getResidentcategory, createResidentCategory, updateResidentCategory, disableResidentCategory, enableResidentCategory } = require('../controllers/ResidentCategoryController');

router.get('/', getAllResidentCategories);
router.get('/option', getResidentcategory);
router.post('/', createResidentCategory);
router.post('/:id/update', updateResidentCategory);
router.post('/:id/disable', disableResidentCategory);
router.post('/:id/enable', enableResidentCategory);

module.exports = router;