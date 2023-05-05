const Game2 = require('../models/game2Model');

// Controlador para obtener la colección de juegos
exports.getAllGames = async (req, res) => {
    try {
        const games = await Game2.find();
        res.send(games);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener la colección de juegos');
    }
};
