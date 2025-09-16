const Livro = require('../models/Livro');

async function getTodosLivros() {
  return await Livro.findAll();
}

async function getLivroPorId(id) {
  return await Livro.findByPk(id);
}

async function insereLivro(livroNovo) {
  await Livro.create(livroNovo);
}

async function modificaLivro(modificacoes, id) {
  const livro = await Livro.findByPk(id);
  if (!livro) throw new Error('Livro não encontrado');

  await livro.update(modificacoes);
  return livro;
}


async function deletaLivroPorId(id) {
  const livro = await Livro.findByPk(id);
  if (!livro) throw new Error('Livro não encontrado');

  await livro.destroy();
}


module.exports = {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  modificaLivro,
  deletaLivroPorId
};