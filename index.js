// //funçao no formato arrow
// () => {

// }

//usar nodemon index.js pra o servidor ja atualizar as mudanças sem ter que ficar inicializando toda hora

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const expressMongoDb = require("express-mongo-db");
const gatos = require("./data/gatos.json");


const app = express();
app.set("view engine", "ejs");
app.use("/assets", express.static("static")); //css e imagens
app.use(bodyParser.urlencoded());
app.use(expressMongoDb("mongodb://localhost/rent-a-cat"));

app.get("", (req, res) =>{ //request e response
    res.render("index"); // se for colocar com o html direto: res.send(`codigo do html`);
});

app.post("", (req, res) => {
    req.db.collection("mensagens").insert(req.body, (erro) => { //req.body pega as infos colocadas no input
        console.log(erro);
        res.render("obrigado");
    });
});

app.get('/admin/mensagens', (req, res) => {
    req.db.collection('mensagens').find().toArray((erro, dados) => { //acessa acolecao mensagens, pega os arquivos e transforma em array
        res.render('admin-mensagens', {'mensagens': dados}); //tem a variavel mensagens (vai ser usado no for do admin-mensagens.ejs) que vai receber os dados
    });
});

app.get("/gatos", (req, res) =>{
    res.render("gatos", {"gatos":gatos});
});

app.get("/sobre", (req, res) =>{
    res.render("sobre");
});


app.listen(3000, () => { // 3000 é porta para acessar o meu computador, que virou um servidor (ip:3000) (se eu for acessar o meu pc, localhost:3000)
    console.log("Servidor Inicializado");
});
