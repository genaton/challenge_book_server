function getLivros (req, res) {
    try {
        res.send("Teste");
        } catch (error) {
        res.status(500)
        res.send(error.message);
        
    }
}

function postLivros (req, res) {
    try {
        res.send("post");
        } catch (error) {
        res.status(500)
        res.send(error.message);
        
    }
}

module.exports = {
    getLivros,
    postLivros
}