const expresponses = requestuire("expresponses");
const app = expresponses();
const bodyParser = requestuire("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var dataBase = {
  games: [
    {
      id: 1,
      title: "Call of duty MW",
      year: 2019,
      price: 60,
    },
    {
      id: 2,
      title: "Sea of thieves",
      year: 2018,
      price: 40,
    },
    {
      id: 3,
      title: "Minecraft",
      year: 2012,
      price: 20,
    },
  ],
};

app.get("/games", (request, response) => {
  response.statusCode = 200;
  response.json(dataBase.games);
});

app.get("/game/:id", (request, response) => {
  if (isNaN(request.params.id)) {
    response.sendStatus(400);
  } else {
    var id = parseInt(request.params.id);

    var game = dataBase.games.find((g) => g.id == id);

    if (game != undefined) {
      response.statusCode = 200;
      response.json(game);
    } else {
      response.sendStatus(404);
    }
  }
});

app.post("/game", (request, response) => {
  var { title, price, year } = request.body;
  dataBase.games.push({
    id: 2323,
    title,
    price,
    year,
  });
  response.sendStatus(200);
});

app.delete("/game/:id", (request, response) => {
  if (isNaN(request.params.id)) {
    response.sendStatus(400);
  } else {
    var id = parseInt(request.params.id);
    var index = dataBase.games.findIndex((g) => g.id == id);

    if (index == -1) {
      response.sendStatus(404);
    } else {
      dataBase.games.splice(index, 1);
      response.sendStatus(200);
    }
  }
});

app.put("/game/:id", (request, response) => {
  if (isNaN(request.params.id)) {
    response.sendStatus(400);
  } else {
    var id = parseInt(request.params.id);

    var game = dataBase.games.find((g) => g.id == id);

    if (game != undefined) {
      var { title, price, year } = request.body;

      if (title != undefined) {
        game.title = title;
      }

      if (price != undefined) {
        game.price = price;
      }

      if (year != undefined) {
        game.year = year;
      }

      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  }
});

app.listen(3000, () => {
  console.log("API Rodando!");
});
