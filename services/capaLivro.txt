const axios = require('axios');

async function buscarCapaLivro(titulo) {
  try {
    const resposta = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: `intitle:${titulo}`,
        maxResults: 1
      }
    });

    const livro = resposta.data.items?.[0];
    const capa = livro?.volumeInfo?.imageLinks?.thumbnail;

    return capa || null;
  } catch (error) {
    console.error('Erro ao buscar capa:', error.message);
    return null;
  }
}

module.exports = { buscarCapaLivro };