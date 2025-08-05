const express = require('express');
const router = express.Router();

const { 
    GetAllRelationships, 
    GetRelationship,
    CreateRelationship,
    UpdateRelationship,
    DisableRelationship,
    EnableRelationship
} = require('../controllers/RelationshipController');

router.get('/', GetAllRelationships);
router.get('/option', GetRelationship);
router.post('/', CreateRelationship);
router.post('/:id/update', UpdateRelationship);
router.post('/:id/disable', DisableRelationship);
router.post('/:id/enable', EnableRelationship);

module.exports = router;