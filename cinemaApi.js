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

    fs.readFile('db.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object
            nextId = Object.keys(obj.users).length;
            newUser = { "id": nextId, "username": username, "email": email, "password": password };
            obj.users.push(newUser); //add some data
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('db.json', json, 'utf8', function() {
                console.log("sucesso");
            }); // write it back 

        }
    });

    res.sendStatus(202);
});


app.listen(3000);
console.log("A ouvir porta 3000");