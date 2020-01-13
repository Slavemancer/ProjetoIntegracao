const express = require('express');
const foo = require('./db.json')
const app = express();

app.use(express.static('public'))

app.get("/filmes/:id", function(req, res) {
    filmes = foo['filmes'];

    filmes.forEach(filme => {
        if (filme.id == req.params.id) {
            res.send(filme);
        }
    });
});

app.get("/filmes/:id/", function(req, res) {
    filmes = foo[''];

    res.send(filmes);
});



app.listen(3000);
console.log("A ouvir porta 3000");