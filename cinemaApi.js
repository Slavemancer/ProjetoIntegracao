const express = require('express');
const session = require('express-session');
const foo = require('./db.json')
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
var path = require("path");

app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/filmes", function(req, res) {
    filmes = foo['filmes'];
    res.send(filmes);
});

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
    var autenticado = false;

    fs.readFile('db.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data);

            users = obj.users;

            users.forEach(user => {
                if (user['username'] == username && user['password'] == password) {
                    autenticado = true;
                }
            });

            if (autenticado === true) {
                sess = req.session;
                sess.username = username;
                res.redirect(301, "http://localhost:3000/index.html");
            } else {
                res.send("<script LANGUAGE='JavaScript'>window.alert('Dados inválidos');window.location.href = 'login.html'; </script>");
            }

        }
    });


});


app.post('/registo/', function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var users = foo["users"];
    users.forEach(user => {
        if (user.username == username || user.email == email) {
            res.send("<script LANGUAGE='JavaScript'>window.alert('O Utilizador/Email já está a ser utilizado');window.location.href = 'registo.html'; </script>");
            res.end();
        }
    })
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
                    res.send("<script LANGUAGE='JavaScript'>window.alert('Erro durante o registo, tente novamente');window.location.href = 'registo.html'; </script>");
                } else {
                    console.log("chegou aqui");
                    res.redirect(301, "http://localhost:3000/login.html");
                }
            });

        }
    });
});


app.listen(3000);
console.log("A ouvir porta 3000");