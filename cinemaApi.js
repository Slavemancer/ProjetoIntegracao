const fetch = require('node-fetch');
const express = require('express');
const session = require('express-session');
const foo = require('./db.json')
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
var path = require("path");

key = "18484c8fa21a4003ccf38cd09a432aa8";
url = "https://api.themoviedb.org/3/search/movie";
adminurl = "https://api.themoviedb.org/3/movie";


app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function getData(url) {
    return await fetch(url).then((data) => data.json()).then((data) => {
        return data;
    });
}

app.post("/admin/filmes/adicionar/:id", function(req, res) {
    link = adminurl + "/" + req.params.id + "?api_key=" + key;
    console.log(link);

    adicionarFilme(link, req, res);

});

async function adicionarFilme(link, req, res) {
    newFilme = await getData(link);

    var filmes = foo["filmes"];
    filmes.forEach(filme => {
        if (filme.id == req.params.id) {
            res.send("<script LANGUAGE='JavaScript'>window.alert('O filme já está disponivel');window.location.href = 'registo.html'; </script>");
            res.end();
        }
    })
    fs.readFile('db.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data);
            nextId = Object.keys(obj.filmes).length;
            obj.filmes.push(newFilme);
            json = JSON.stringify(obj);
            fs.writeFile('db.json', json, 'utf8', function(err) {

                if (err) {
                    console.log(err);
                    res.send("<script LANGUAGE='JavaScript'>window.alert('Erro durante o registo, tente novamente');window.location.href = 'registo.html'; </script>");
                } else {
                    console.log("chegou aqui");
                    res.redirect(301, "http://localhost:3000/admin/index.html");
                }
            });

        }
    });
}

app.get("/admin/filmes/:query", function(req, res) {
    link = url + "?api_key=" + key + "&query=" + req.params.query;
    console.log(link);

    getData(link).then((ans) => {
        filmes = foo["filmes"];
        filmesNovos = ans.results;
        lista = [];
        existe = false;
        filmes.forEach(filme => {
            filmesNovos.forEach(filmenovo => {
                if (filme.id == filmenovo.id) {
                    existe = true;
                }
            });
            if (!existe) {
                lista.push(filme);
            }
        });
        res.send(ans.results)
    });
});
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
    });
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

app.get("/sessoes/:filmeId", function(req, res) {

    sessoes = foo['sessao'];
    temp = [];
    console.log(req.params.filmeId);

    sessoes.forEach(sessao => {
        if (sessao.filmeId == req.params.filmeId) {

            temp.push(sessao);
        }
    });

    res.send(temp);

});

app.post("/reservar/", function(req, res) {

    var nrBilhetes = req.body.bilhetes;
    var dia = req.body.dias.split(",")[0];
    var filmeId = req.body.dias.split(",")[2];
    var horas = req.body.horarios;



    fs.readFile('db.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data);
            nextId = Object.keys(obj.reservas).length;
            newReserva = { "id": nextId, "filmeId": filmeId, "username": req.session.username, "dia": dia, "horas": horas, "nrBilhetes": nrBilhetes };
            obj.reservas.push(newReserva);
            json = JSON.stringify(obj);
            fs.writeFile('db.json', json, 'utf8', function(err) {

                if (err) {
                    console.log(err);
                    res.send("<script LANGUAGE='JavaScript'>window.alert('Erro durante a reserva, tente novamente');window.location.href = 'reserva.html'; </script>");
                } else {
                    console.log("chegou aqui");
                    res.redirect(301, "http://localhost:3000/index.html");
                }
            });

        }
    });


});

app.get("/loginInfo", function(req, res) {

    username = req.session.username;
    if (username) {
        res.send(JSON.stringify(username));
        res.end();
    } else {
        res.send(JSON.stringify("erro"));
        res.end();
    }




});

app.get("/logout", function(req, res) {
    req.session.destroy();
    res.send(JSON.stringify("logout"));
});


app.listen(3000);
console.log("A ouvir porta 3000");