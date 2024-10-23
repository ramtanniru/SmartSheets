const express = require('express');
const { syncSheetToDb, sync, createData, getAllData, getDataById, updateData, deleteData } = require('../controllers/dataController');

const router = express.Router();

router.post('/sync/sheet-to-db', syncSheetToDb);
router.post('/sync/db-to-sheet', sync);
router.post('/api/data', createData);
router.get('/api/data', getAllData);
router.get('/api/data/:id', getDataById);
router.put('/api/data/:id', updateData);
router.delete('/api/data/:id', deleteData);

module.exports = router;
