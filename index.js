const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dataBase = {
  games: {
    1: { title: "Call of Duty MW", year: 2019, price: 60 },
    2: { title: "Sea of Thieves", year: 2018, price: 40 },
    3: { title: "Minecraft", year: 2012, price: 20 },
  },
};

app.get("/games", (request, response) => {
  response.status(200).json(dataBase.games);
  dataBase.games;
});

app.get("/game/:id", (request, response) => {
  const id = parseInt(request.params.id);

  if (isNaN(id)) {
    return response.status(400).send("400 : Bad Request - ID inválido");
  }

  const game = dataBase.games[id];

  if (game) {
    return response.status(200).json(game);
  } else {
    return response.status(404).send("404 : Not Found - Jogo não encontrado");
  }
});

app.post("/games", (request, response) => {
  const { title, year, price } = request.body;
  const newId = Object.keys(database.games).length + 1;

  dataBase.games[newId] = { title, year, price };

  response
    .status(201)
    .json({ message: "Jogo adicionado com sucesso", id: newId });
});

app.get("/game/:id", (request, response) => {
  const id = parseInt(request.params.id);

  if (isNaN(id)) {
    return response.status(400).send("400 : Bad Request - ID inválido");
  }

  const game = dataBase.games[id];

  if (game) {
    return response.status(200).json(game);
  } else {
    return response.status(404).send("404 : Not Found - Jogo não encontrado");
  }
});

app.delete("/game/:id", (request, response) => {
  const id = parseInt(request.params.id);

  if (isNaN(id)) {
    return response.status(400).send("400 : Bad Request - ID inválido");
  }

  if (dataBase.games[id]) {
    delete dataBase.games[id];
    return response.status(200).send("Jogo deletado com sucesso");
  } else {
    return response.status(404).send("404 : Not Found - Jogo não encontrado");
  }
});

app.put("/game/:id", (request, response) => {
  const id = parseInt(request.params.id);

  if (isNaN(id)) {
    return response.status(400).send("400 : Bad Request - ID inválido");
  }

  const game = dataBase.games[id];
  if (!game) {
    return response.status(404).send("404 : Not Found - Jogo não encontrado");
  }

  const { title, year, price } = request.body;
  if (title) game.title = title;
  if (year) game.year = year;
  if (price) game.price = price;

  response.status(200).send("Jogo atualizado com sucesso");
});

app.listen(3000, () => {
  console.log("API Rodando na porta 3000");
});
