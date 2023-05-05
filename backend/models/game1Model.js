const mongoose = require('mongoose');

const game1Schema = new mongoose.Schema({
    fechaHora: Date,
    nombre: String,
    resultado: String
    
}, { versionKey: false });

const Game1 = mongoose.model('Game1', game1Schema);

module.exports = Game1;
