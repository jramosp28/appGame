const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');

// Rutas
const game1Routes = require('./routes/game1');
const game2Routes = require('./routes/game2');
const recordsRoutes = require('./routes/records');

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  if (db.readyState === 1) {
    next();
  } else {
    res.status(500).send('Error al conectar con la base de datos');
  }
});

// Rutas middleware
app.use('/game1', game1Routes);
app.use('/game2', game2Routes);
app.use('/records', recordsRoutes);

// Configuración de CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4200']
}));

// Inicio del servidor
app.listen(3000, () => console.log('Servidor iniciado en el puerto http://localhost:3000'));