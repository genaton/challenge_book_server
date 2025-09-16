const {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  modificaLivro,
  deletaLivroPorId,
} = require("../services/livro");

const { buscarCapaLivro } = require("../services/capaLivro");

async function getLivros(req, res) {
  try {
    const livros = await getTodosLivros();
    res.status(200).json(livros);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

async function getLivro(req, res) {
  try {
    const id = parseInt(req.params.id);
    const livro = await getLivroPorId(id);

    if (!livro) {
      return res.status(404).json({ mensagem: "Livro não encontrado" });
    }

    res.status(200).json(livro);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

async function postLivro(req, res) {
  try {
    let livroNovo = req.body;

    // Busca capa automaticamente se não foi informada
    if (!livroNovo.imagem && livroNovo.titulo) {
      const capa = await buscarCapaLivro(livroNovo.titulo);
      if (capa) livroNovo.imagem = capa;
    }

    await insereLivro(livroNovo);
    res
      .status(201)
      .json({ mensagem: "Livro inserido com sucesso", livro: livroNovo });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

async function patchLivro(req, res) {
  try {
    const id = parseInt(req.params.id);
    let modificacoes = req.body;

    const livroAtual = await getLivroPorId(id);
    if (!livroAtual) {
      return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }

    // Se o título foi alterado, buscar nova capa
    if (
      modificacoes.titulo &&
      modificacoes.titulo !== livroAtual.titulo
    ) {
      const novaCapa = await buscarCapaLivro(modificacoes.titulo);
      if (novaCapa) modificacoes.imagem = novaCapa;
    }

    const livroAtualizado = await modificaLivro(modificacoes, id);
    res.status(200).json({
      mensagem: 'Livro modificado com sucesso',
      livro: livroAtualizado
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}
async function deleteLivro(req, res) {
  try {
    const id = parseInt(req.params.id);
    await deletaLivroPorId(id);
    res.status(200).json({ mensagem: "Livro deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

module.exports = {
  getLivros,
  getLivro,
  postLivro,
  patchLivro,
  deleteLivro,
};
