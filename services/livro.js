const fs = require("fs");

function getTodosLivros() {
  return JSON.parse(fs.readFileSync("livros.json"));
}

function getLivroPorId(id) {
  const livros = JSON.parse(fs.readFileSync("livros.json"));
  const livroFiltrato = livros.filter((livro) => livro.id === id)[0];
  return livroFiltrato;
}

function insereLivro(livroNovo) {
  const livros = JSON.parse(fs.readFileSync("livros.json"));
  const novaListaLivros = [...livros, livroNovo];
  fs.writeFileSync("livros.json", JSON.stringify(novaListaLivros));
}

function modificaLivro(modificacoes, id) {
  let livrosAtuais = JSON.parse(fs.readFileSync("livros.json"));
  const indicieModificado = livrosAtuais.findIndex((livro) => livro.id === id);

  const conteudoMudado = {
    ...livrosAtuais[indicieModificado],
    ...modificacoes,
  };

  livrosAtuais[indicieModificado] = conteudoMudado;

  fs.writeFileSync("livros.json", JSON.stringify(livrosAtuais));
}

function deletaLivroPorId(id) {
  const livros = JSON.parse(fs.readFileSync("livros.json"));
  const livroFiltratos = livros.filter((livro) => livro.id !== id);

  fs.writeFileSync("livros.json", JSON.stringify(livroFiltratos));
}

module.exports = {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  modificaLivro,
  deletaLivroPorId
};
