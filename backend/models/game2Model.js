const mongoose = require('mongoose');

const game2Schema = new mongoose.Schema({
    nombreMascota: String,
    hambre: Number,
    energia: Number,
    felicidad: Number,
    fNacimiento: Date

}, { versionKey: false });

const Game2 = mongoose.model('Game2', game2Schema);

module.exports = Game2;
