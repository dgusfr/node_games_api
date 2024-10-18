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

// app.post("/game", (request, response) => {
//   const { title, price, year } = request.body;
//   dataBase.games.push({
//     id: 2323,
//     title,
//     price,
//     year,
//   });
//   response.sendStatus(200);
// });

// app.delete("/game/:id", (request, response) => {
//   if (isNaN(request.params.id)) {
//     response.sendStatus(400);
//   } else {
//     const id = parseInt(request.params.id);
//     const index = dataBase.games.findIndex((g) => g.id == id);

//     if (index == -1) {
//       response.sendStatus(404);
//     } else {
//       dataBase.games.splice(index, 1);
//       response.sendStatus(200);
//     }
//   }
// });

// app.put("/game/:id", (request, response) => {
//   if (isNaN(request.params.id)) {
//     response.sendStatus(400);
//   } else {
//     const id = parseInt(request.params.id);

//     const game = dataBase.games.find((g) => g.id == id);

//     if (game != undefined) {
//       const { title, price, year } = request.body;

//       if (title != undefined) {
//         game.title = title;
//       }

//       if (price != undefined) {
//         game.price = price;
//       }

//       if (year != undefined) {
//         game.year = year;
//       }

//       response.sendStatus(200);
//     } else {
//       response.sendStatus(404);
//     }
//   }
// });

app.listen(3000, () => {
  console.log("API Rodando na porta 3000");
});
