const {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  modificaLivro,
  deletaLivroPorId,
} = require("../services/livro");

function getLivros(req, res) {
  try {
    const livros = getTodosLivros();
    res.send(livros);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}
function getLivro(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      const livro = getLivroPorId(id);
      res.send(livro);
    } else {
      res.status(422);
      res.send("Id inválido");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}
function postLivro(req, res) {
  try {
    const livroNovo = req.body;
    if (req.body.nome && req.body.id) {
      if (isNaN(Number(req.body.id))) {
        res.status(422);
        res.send("O campo id deve ser um número");
        return;
      }
      insereLivro(livroNovo);
      res.status(201);
      res.send("livro inserido com sucesso");
    } else if (req.body.nome) {
      res.status(422);
      res.send("O id nome é obrigatório");
    } else if (req.body.id) {
      res.status(422);
      res.send("O campo nome é obrigatório");
    } else {
      res.status(422);
      res.send("É obrigatório informar o id e o nome do livro");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

function patchLivro(req, res) {
  try {
    const id = req.params.id;

    if (id && Number(id)) {
      const livro = getLivroPorId(id);
      if (!livro) {
        res.status(404);
        res.send("Id inexistente");
        return;
      }
      const body = req.body;
      modificaLivro(body, id);
      res.send("item modificado com sucesso");
    } else {
      res.status(422);
      res.send("Id inválido");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

function deleteLivro(req, res) {
  try {
    const id = req.params.id;

    if (!id || isNaN(Number(id))) {
      res.status(422);
      res.send("Id inválido");
      return;
    }

    const livro = getLivroPorId(id); 

    if (!livro) {
      res.status(404);
      res.send("Id inexistente");
      return;
    }

    deletaLivroPorId(id);
    res.send("Item deletado com sucesso");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

module.exports = {
  getLivros,
  getLivro,
  postLivro,
  patchLivro,
  deleteLivro,
};
