const express = require("express");
const rotaLivro = require("./routes/livro");
require('./db'); // 🔌 Conecta ao MySQL

const app = express();
app.use(express.json());

const port = 8000;

app.use('/livros', rotaLivro);


app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

app.listen(port, () =>
  console.log(`Escutando a porta ${port}`)
);