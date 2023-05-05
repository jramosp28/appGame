const express = require("express");
const router = express.Router();
const GameController = require("../controllers/game2Controller");
const Game2 = require("../models/game2Model");

// Endpoint para obtener la colección de usuarios
router.get("/", GameController.getAllGames);

// Obtener un juego por ID
router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const game = await Game2.findById(_id);
    res.json(game);
    console.log("juego encontrado!");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Crear un nuevo juego
router.post("/", async (req, res) => {
  try {
    const game = new Game2(req.body);
    await game.save();
    res.status(201).json(game);
    console.log("juego creado!");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar un juego existente
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game2.findByIdAndUpdate(id, req.body, { new: true });
    res.json(game);
    console.log("juego actualizado!");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un juego existente
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Game2.findByIdAndDelete(id);
    res.status(204).send();
    console.log("juego borrado!");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
