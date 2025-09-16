const axios = require("axios");

async function buscarCapaLivro(titulo) {
  try {
    const resposta = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      {
        params: {
          q: `intitle:${titulo}`,
          maxResults: 1,
        },
      }
    );

    const livro = resposta.data.items?.[0];
    const imagens = livro?.volumeInfo?.imageLinks;

    if (!imagens) return null;

    // Tenta pegar da maior para a menor
    const capa =
      imagens.extraLarge ||
      imagens.large ||
      imagens.medium ||
      imagens.small ||
      imagens.thumbnail ||
      imagens.smallThumbnail;

    return capa || null;
  } catch (error) {
    console.error("Erro ao buscar capa:", error.message);
    return null;
  }
}

module.exports = { buscarCapaLivro };
