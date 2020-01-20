const express = require('express');
const foo = require('./db.json')
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.post("/login/", function(req, res) {

    var username = req.body.username;
    var password = req.body.password;

    res.send("user: " + username + " pass: " + password);

});


app.post('/registo/', function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var status = 202;

    fs.readFile('db.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data);
            nextId = Object.keys(obj.users).length;
            newUser = { "id": nextId, "username": username, "email": email, "password": password };
            obj.users.push(newUser);
            json = JSON.stringify(obj);
            fs.writeFile('db.json', json, 'utf8', function(err) {

                if (err) {
                    console.log(err);
                    status = 404;
                } else {
                    status = 301;
                }
            });

        }
    });

    if (status == 301) {
        res.redirect(301, "http://localhost:3000/login.html");

    } else {
        res.redirect(302, "http://localhost:3000/registo.html");
    }

    res.end();
});


app.listen(3000);
console.log("A ouvir porta 3000");