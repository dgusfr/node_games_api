const axios = require("axios");

const resquest = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

async function getAllGames() {
  try {
    const response = resquest.get("/games");
    console.log("Lista dos games:", response.data);
  } catch (error) {
    console.error(
      `Erro ao remover jogo com ID ${id}:`,
      error.response ? error.response.data : error.message
    );
  }
}
