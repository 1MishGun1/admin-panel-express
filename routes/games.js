const gamesRouter = require("express").Router();
const { readData, writeData } = require("../utils/data");

//? Getting games
const getAllGames = async (req, res) => {
  const games = await readData("../utils/data/games.json");
  if (!games) {
    res.status(400);
    res.end({
      status: "error",
      message: "No games in database. Please, you add new game",
    });
    return;
  }
  req.games = games;
  res.send(req.games);
};

//? Delete game
const deleteGame = async (req, res) => {
  const games = await readData("../utils/data/games.json");
  if (!games) {
    res.status(400);
    res.end({
      status: "error",
      message: "No games in database. Please, you add new game",
    });
    return;
  }
  req.games = games;

  //? Read game by id
  const id = Number(req.params.id);

  //? Search game by id, which you need delete
  res.game = req.games.find((item) => item.id === id);

  //? Search game by id
  const index = req.games.findIndex((item) => item.id === req.game.id);

  //? Delete game
  res.games.splice(index, 1);

  //? Write update array in games.json
  await writeData("../utils/data/games.json", req.games);

  //? Show response about the operation performed
  res.send({
    games: req.games,
    updated: req.game,
  });

  gamesRouter.get("/games", getAllGames);
  gamesRouter.get("/games", deleteGame);
};

module.exports = gamesRouter;
