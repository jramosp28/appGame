import { useState, useEffect } from "react";
import './Game1.css';
// import axios from 'axios';
const options = [
    { id: 0, name: "Piedra", emoji: "✊", beats: [2, 3] },
    { id: 1, name: "Papel", emoji: "🧻", beats: [0] },
    { id: 2, name: "Tijera", emoji: "✂️", beats: [1, 3] },
    { id: 3, name: "Lagarto", emoji: "🦎", beats: [1] },
    { id: 4, name: "Spock", emoji: "🖖", beats: [3, 0] },
];

const getResult = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
        return 0;
    }

    if (options[userChoice].beats.includes(computerChoice)) {
        return 1;
    }

    return 2;
};

function OptionButton({ option, handlePlay, disabled }) {
    return (
        <button
            className="px-4 py-2 m-2 text-xl font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            onClick={() => handlePlay(option.id)}
            title={option.name}
        >
            {option.emoji}
        </button>
    );
}

function useChoices() {
    const [userChoice, setUserChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [userMessage, setUserMessage] = useState(null);
    const [computerMessage, setComputerMessage] = useState(null);
    const [result, setResult] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [playerName, setPlayerName] = useState('usuario');


    useEffect(() => {
        if (userChoice !== null) {
            setUserMessage(
                `Has elegido ${options[userChoice]?.emoji} - ${options[userChoice]?.name}`
            );
        }
    }, [userChoice]);

    useEffect(() => {
        if (computerChoice !== null) {
            setComputerMessage(
                `El ordenador ha elegido ${options[computerChoice]?.emoji} - ${options[computerChoice]?.name}`
            );
        }
    }, [computerChoice]);
    // const postData = async () => {
    //     const data = {
    //         fechaHora: new Date().toISOString(),
    //         nombre: playerName,
    //         resultado: result === 1 ? 'victoria' : result === 2 ? 'derrota' : 'empate'
    //     };
    //     try {
    //         const response = await axios.post('http://localhost:3000/game1', data);
    //         console.log("RESPONSE", response.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    useEffect(() => {
        if (result !== null && gameOver) {
                const gameData = {
                    
                    jugador: playerName,
                    resultado: result === 1 ? 'victoria' : result === 2 ? 'derrota' : 'empate'
                };
                console.log(gameData);

            //     fetch('http://localhost:3000/game1', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify(gameData)
            //     })
            //         .then((response) => {
            //             if (response.ok) {
            //                 // Envío de datos exitoso
            //             } else {
            //                 // El envío de datos falló
            //                 // Puedes manejar el error de alguna manera
            //             }
            //         })
            //         .catch((error) => {
            //             // Error al intentar enviar los datos
            //             // Puedes manejar el error de alguna manera
            //         });
            fetch("http://localhost:3000/game1/", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                },

                body: JSON.stringify(gameData),

            })
            .then((response) => {
                if (response.ok) {
                    console.log('Datos de la partida enviados correctamente.');
                } else {
                    
                    console.log('Error al enviar los datos de la partida.');
                }
            })
            .catch((error) => {
                console.log('Error en la solicitud POST:', error);
            });
    
            // postData();
        }

    }, [result, gameOver]);

    const handlePlay = (choice) => {
        setUserChoice(choice);
        setDisabled(true);
        const randomChoice = Math.floor(Math.random() * 5);

        setTimeout(() => {
            setComputerChoice(randomChoice);
        }, 1500);

        setTimeout(() => {
            setResult(getResult(choice, randomChoice));
            setGameOver(true); // Agregamos esta línea para indicar que el juego ha terminado
        }, 3000);
    };

    const reset = () => {
        setUserChoice(null);
        setComputerChoice(null);
        setUserMessage(null);
        setComputerMessage(null);
        setResult(null);
        setDisabled(false);
        setGameOver(false);
    };

    return {
        userChoice,
        computerChoice,
        userMessage,
        computerMessage,
        result,
        disabled,
        handlePlay,
        reset,
    };
}

function Game() {
    const {
        userChoice,
        computerChoice,
        userMessage,
        computerMessage,
        result,
        disabled,
        handlePlay,
        reset,
    } = useChoices();

    const [playerName, setPlayerName] = useState('');
    const [gameStarted, setGameStarted] = useState(false);

    const handleNameChange = (event) => {
        setPlayerName(event.target.value);
    };

    const handleStartGame = async () => {
        // Validar si se ingresó un nombre antes de comenzar el juego
        if (playerName.trim() === '') {
            alert('Por favor, ingresa tu nombre antes de comenzar el juego.');
            return;
        }

        // Restablecer el nombre del jugador después de iniciar el juego
        setPlayerName('');
        setGameStarted(true);
    };

    const handlePlayAgain = () => {
        reset();
        setGameStarted(false);
    };

    return (
        <div className="container">
            <h1 className="title">¡A jugar!</h1>

            {!gameStarted ? (
                <div>
                    <input
                        type="text"
                        value={playerName}
                        onChange={handleNameChange}
                        placeholder="Ingresa tu nombre"
                    />

                    <button className="start-game" onClick={handleStartGame}>
                        Comenzar juego
                    </button>
                </div>
            ) : (
                <div>
                    {options.map((option) => (
                        <OptionButton
                            key={option.id}
                            option={option}
                            handlePlay={handlePlay}
                            disabled={disabled}
                        />
                    ))}
                    {userChoice !== null && <p className="message">{userMessage}</p>}
                    {computerChoice !== null && <p className="message">{computerMessage}</p>}
                    {result !== null && (
                        <div>
                            {result === 0 && <p className="result">Empate 🤷🏽‍♀️</p>}
                            {result === 1 && (
                                <p className="result">
                                    ✅ Has ganado con {options[userChoice]?.name} contra{" "}
                                    {options[computerChoice]?.name}
                                </p>
                            )}
                            {result === 2 && (
                                <p className="result">
                                    ❌ Has perdido con {options[userChoice]?.name} contra{" "}
                                    {options[computerChoice]?.name}
                                </p>
                            )}
                            <button className="play-again" onClick={handlePlayAgain}>
                                Jugar de nuevo
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Game;