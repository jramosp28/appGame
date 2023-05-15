import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Records = () => {
    const [gameResults, setGameResults] = useState([]);
    const [selectedGame, setSelectedGame] = useState('');

    useEffect(() => {
        // Llama a la API para obtener los resultados del juego seleccionado
        const fetchGameResults = async () => {
            try {
                const response = await axios.get(`/${selectedGame}`); // Corregir la ruta a `/api/records/${selectedGame}`
                setGameResults(response.data); // No es necesario acceder a `response.data.results`
            } catch (error) {
                console.error('Error al obtener los resultados del juego:', error);
            }
        };

        if (selectedGame !== '') {
            fetchGameResults();
        }
    }, [selectedGame]);

    const handleGameChange = (event) => {
        setSelectedGame(event.target.value);
    };

    return (
        <div>
            <h1>Resultados de Juegos</h1>

            <label htmlFor="gameSelect">Selecciona el juego:</label>
            <select id="gameSelect" value={selectedGame} onChange={handleGameChange}>
                <option value="">-- Selecciona un juego --</option>
                <option value="game1">Juego 1</option>
                <option value="game2">Juego 2</option>
                {/* Añade más opciones según tus juegos */}
            </select>

            {selectedGame !== '' && gameResults.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Jugador</th>
                            <th>Fecha y Hora</th>
                            <th>Resultado</th>
                            {/* Agrega más encabezados de columna según tus datos */}
                        </tr>
                    </thead>
                    <tbody>
                        {gameResults.map((result) => (
                            <tr key={result._id}>
                                <td>{result.nombre}</td>
                                <td>{result.fechaHora}</td>
                                <td>{result.resultado}</td>
                                {/* Agrega más celdas según tus datos */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Records;
