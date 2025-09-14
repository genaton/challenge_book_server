const { Router } = require("express");

const { getLivros, postLivros } = require("../controllers/livro");

const router = Router();


router.get('/', getLivros)

router.post('/', postLivros)


router.patch('/', (req, res) => {
    res.send("Teste");
})

router.delete('/', (req, res) => {
    res.send("Teste");
})

module.exports = router;