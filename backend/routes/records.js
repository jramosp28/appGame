const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/recordController');

// Ruta para obtener todos los registros de un juego
router.get('/:gameName', recordsController.getAllGameRecords);

module.exports = router;
