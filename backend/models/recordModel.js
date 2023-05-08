const mongoose = require('mongoose');

const game1Schema = new mongoose.Schema({
    fechaHora: Date,
    nombre: String,
    resultado: String
    
}, { versionKey: false });

const Game1 = mongoose.model('Game1', game1Schema);


const game2Schema = new mongoose.Schema({
    nombreMascota: String,
    hambre: Number,
    energia: Number,
    felicidad: Number,
    fNacimiento: Date

}, { versionKey: false });

const Game2 = mongoose.model('Game2', game2Schema);

module.exports = [
    Game1,
    Game2
];
