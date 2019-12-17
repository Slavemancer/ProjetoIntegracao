const express = require('express');
const foo = require('../db.json')
const app = express();

app.get("/filmes/:id", function(req, res) {
    filmes = foo['filmes'];

    filmes.forEach(filme => {
        if (filme.id == req.params.id) {
            res.send(filme);
        }
    });
});

app.get("/filmes/", function(req, res) {
    filmes = foo['filmes'];

    res.send(filmes);
});





app.listen(3000);