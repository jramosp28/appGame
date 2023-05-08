import axios from 'axios';

const createGameInDatabase = async (gameData) => {
  try {
    const response = await axios.post('/game1', gameData);
    console.log('Juego creado en la base de datos:', response.data);
    // Realiza cualquier acción adicional necesaria después de crear el juego en la base de datos
  } catch (error) {
    console.error('Error al crear el juego en la base de datos:', error);
    // Realiza cualquier manejo de errores necesario
  }
};

export { createGameInDatabase };
