const express = require('express');
const router = express.Router();

const { getAllRelationships, getRelationship, createRelationship, updateRelationship, disableRelationship, enableRelationship } = require('../controllers/RelationshipController');

router.get('/', getAllRelationships);
router.get('/option', getRelationship);
router.post('/', createRelationship);
router.post('/:id/update', updateRelationship);
router.post('/:id/disable', disableRelationship);
router.post('/:id/enable', enableRelationship);

module.exports = router;