const express = require('express');
const router = express.Router();

const { 
    GetAllResidentCategories, 
    GetResidentcategory,
    CreateResidentCategory,
    UpdateResidentCategory,
    DisableResidentCategory,
    EnableResidentCategory
} = require('../controllers/ResidentCategoryController');

router.get('/', GetAllResidentCategories);
router.get('/option', GetResidentcategory);
router.post('/', CreateResidentCategory);
router.post('/:id/update', UpdateResidentCategory);
router.post('/:id/disable', DisableResidentCategory);
router.post('/:id/enable', EnableResidentCategory);

module.exports = router;