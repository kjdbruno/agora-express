const express = require('express');
const router = express.Router();

const { 
    getAllBlotters,
    createBlotter,
    updateBlotter,
    disableBlotter,
    enableBlotter,
    getAllBlotterParties,
    createBlotterParty,
    disableBlotterParty,
    enableBlotterParty,
    getAllBlotterHandlers,
    createBlotterHandler,
    disableBlotterHandler,
    enableBlotterHandler,
    getAllBlotterActions,
    createBlotterAction,
    disableBlotterAction,
    enableBlotterAction,
    getAllBlotterAttachments,
    createBlotterAttachment,
    deleteBlotterAttachment,
    getAllBlotterActionAttachments,
    createBlotterActionAttachment,
    deleteBlotterActionAttachment
 } = require('../controllers/BlotterController');

 const multer = require('multer');
 const storage = multer.memoryStorage();
 const upload = multer({ storage });

router.get('/', getAllBlotters);
router.post('/', createBlotter);
router.post('/:id/update', updateBlotter);
router.post('/:id/disable', disableBlotter);
router.post('/:id/enable', enableBlotter);

router.get('/party', getAllBlotterParties);
router.post('/party', createBlotterParty);
router.post('/party/:id/disable', disableBlotterParty);
router.post('/party/:id/enable', enableBlotterParty);

router.get('/handler', getAllBlotterHandlers);
router.post('/handler', createBlotterHandler);
router.post('/handler/:id/disable', disableBlotterHandler);
router.post('/handler/:id/enable', enableBlotterHandler);

router.get('/action', getAllBlotterActions);
router.post('/action', createBlotterAction);
router.post('/action/:id/disable', disableBlotterAction);
router.post('/action/:id/enable', enableBlotterAction);

router.get('/attachment', getAllBlotterAttachments);
router.post('/attachment', upload.array('files'), createBlotterAttachment);
router.post('/attachment/:id/delete', deleteBlotterAttachment);

router.get('/action/attachment', getAllBlotterActionAttachments);
router.post('/action/attachment', upload.array('files'), createBlotterActionAttachment);
router.post('/action/attachment/:id/delete', deleteBlotterActionAttachment);

module.exports = router;