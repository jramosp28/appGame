const GameModel = require('../models/recordModel');

// Controlador para obtener todos los registros del juego
exports.getAllGameRecords = async (req, res) => {
  try {
    const gameRecords = await GameModel.find();
    res.send(gameRecords);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los registros del juego');
  }
};
