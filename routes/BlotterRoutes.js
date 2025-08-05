const express = require('express');
const router = express.Router();

const { 
    GetAllBlotters, 
    CreateBlotter,
    UpdateBlotter,
    DisableBlotter,
    EnableBlotter,
    GetAllBlotterParties,
    CreateBlotterParty,
    DisableBlotterParty,
    EnableBlotterParty,
    GetAllBlotterHandlers,
    CreateBlotterHandler,
    DisableBlotterHandler,
    EnableBlotterHandler,
    GetAllBlotterActions,
    CreateBlotterAction,
    DisableBlotterAction,
    EnableBlotterAction,
    GetAllBlotterAttachments,
    CreateBlotterAttachment,
    DeleteBlotterAttachment,
    GetAllBlotterActionAttachments,
    CreateBlotterActionAttachment,
    DeleteBlotterActionAttachment
} = require('../controllers/BlotterController');

 const multer = require('multer');
 const storage = multer.memoryStorage();
 const upload = multer({ storage });

router.get('/', GetAllBlotters);
router.post('/', CreateBlotter);
router.post('/:id/update', UpdateBlotter);
router.post('/:id/disable', DisableBlotter);
router.post('/:id/enable', EnableBlotter);

router.get('/party', GetAllBlotterParties);
router.post('/party', CreateBlotterParty);
router.post('/party/:id/disable', DisableBlotterParty);
router.post('/party/:id/enable', EnableBlotterParty);

router.get('/handler', GetAllBlotterHandlers);
router.post('/handler', CreateBlotterHandler);
router.post('/handler/:id/disable', DisableBlotterHandler);
router.post('/handler/:id/enable', EnableBlotterHandler);

router.get('/action', GetAllBlotterActions);
router.post('/action', CreateBlotterAction);
router.post('/action/:id/disable', DisableBlotterAction);
router.post('/action/:id/enable', EnableBlotterAction);

router.get('/attachment', GetAllBlotterAttachments);
router.post('/attachment', upload.array('files'), CreateBlotterAttachment);
router.post('/attachment/:id/delete', DeleteBlotterAttachment);

router.get('/action/attachment', GetAllBlotterActionAttachments);
router.post('/action/attachment', upload.array('files'), CreateBlotterActionAttachment);
router.post('/action/attachment/:id/delete', DeleteBlotterActionAttachment);

module.exports = router;