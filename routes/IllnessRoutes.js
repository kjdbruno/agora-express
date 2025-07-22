const express = require('express');
const router = express.Router();

const { 
    getAllIllnesses,
    getIllness,
    createIllness,
    updateIllness,
    disableIllness,
    enableIllness
} = require('../controllers/IllnessController');

router.get('/', getAllIllnesses);
router.get('/option', getIllness);
router.post('/', createIllness);
router.post('/:id/update', updateIllness);
router.post('/:id/disable', disableIllness);
router.post('/:id/enable', enableIllness);

module.exports = router;