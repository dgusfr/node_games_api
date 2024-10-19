const axios = require("axios");
const { request, response } = require("express");

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
      "Erro ao listar jogos:",
      error.response ? error.response.data : error.message
    );
  }
}

async function getGameById(id) {
  try {
    const response = await request.get(`/games/${id}`);
    console.log(`Detalhes do game com ID ${id}: `, response.data);
  } catch (error) {
    console.error(
      `Erro ao obter jogo com ID ${id}:`,
      error.response ? error.response.data : error.message
    );
  }
}

async function addGame(newGame) {
  try {
    const response = await request.post("/game", newGame);
    console.log("Novo Jogo Adicionado:", response.data);
  } catch (error) {
    console.error(
      "Erro ao adicionar jogo:",
      error.response ? error.response.data : error.message
    );
  }
}

async function updateGame(id, updatedGame) {
  try {
    const response = await request.put(`/game/${id}`, updatedGame);
    console.log(`Jogo com ID ${id} Atualizado:`, response.data);
  } catch (error) {
    console.error(
      `Erro ao atualizar jogo com ID ${id}:`,
      error.response ? error.response.data : error.message
    );
  }
}

async function deleteGame(id) {
  try {
    await response.delete(`/game/${id}`);
    console.log(`Jogo com ID ${id} removido com sucesso.`);
  } catch (error) {
    console.error(
      `Erro ao remover jogo com ID ${id}:`,
      error.response ? error.response.data : error.message
    );
  }
}

async function runTests() {
  console.log("Iniciando os testes da API...");

  await getAllGames();

  await getGameById(1);

  const novoJogo = {
    title: "The Witcher 3",
    year: 2015,
    price: 50,
  };
  await addGame(novoJogo);

  const atualizacaoJogo = {
    title: "The Witcher 3: Wild Hunt",
    year: 2015,
    price: 55,
  };
  await updateGame(1, atualizacaoJogo);

  await deleteGame(1);

  await getAllGames();

  console.log("Testes concluídos.");
}

runTests();
