const express = require('express');
const foo = require('./db.json')
const app = express();

app.use(express.static('public'));

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

app.post("/login", function(req, res) {

    var username = req.body.username;
    var password = req.body.password;

    res.send("user: " + username + " pass: " + password);

});


app.post('/registo', function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    res.send(username + email + password);
});


app.listen(3000);
console.log("A ouvir porta 3000");