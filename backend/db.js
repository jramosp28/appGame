const mongoose = require('mongoose');
const uri = "mongodb+srv://root:monlau2023@webfinal.7gkv72h.mongodb.net/Juegos";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa'))
  .catch(err => console.error('Error de conexión: ', err));

module.exports = mongoose.connection;
