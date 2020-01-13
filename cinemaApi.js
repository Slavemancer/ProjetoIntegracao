const express = require('express');
const foo = require('./db.json')
const app = express();

app.get("/filmes/id/:id", function(req, res) {
    filmes = foo['filmes'];

    filmes.forEach(filme => {
        if (filme.id == req.params.id) {
            res.send(filme);

        }
    });
});

app.get("/filmes/titulo/:original_title", function(req, res) {

    filmes = foo['filmes'];
    temp = [];

    filmes.forEach(filme => {
        if ((filme.original_title).toLowerCase().includes((req.params.original_title).toLowerCase())) {
            temp.push(filme);
        }
    });

    res.send(temp);

});

app.get('/', function(req, res) {
    res.sendFile('/index.html', { root: __dirname })
});



app.listen(3000);