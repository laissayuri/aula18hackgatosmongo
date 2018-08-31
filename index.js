// //funçao no formato arrow
// () => {

// }

//usar nodemon index.js pra o servidor ja atualizar as mudanças sem ter que ficar inicializando toda hora

const express = require('express');
const bodyParser = require('body-parser');
const expressMongoDb = require("express-mongo-db");
const ObjectID = require('mongodb').ObjectID;


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
    req.db.collection('mensagens').find().toArray((erro, dados) => { //acessa a colecao mensagens, pega os arquivos e transforma em array
        res.render('admin-mensagens', {'mensagens': dados}); //tem a variavel mensagens (vai ser usado no for do admin-mensagens.ejs) que vai receber os dados
    });
});

app.get("/gatos", (req, res) =>{
    req.db.collection('gatos').find().toArray((erro, dados) => {
        res.render('gatos', {'gatos': dados});
    });
});

app.get('/admin/gatos', (req, res) => {
    req.db.collection('gatos').find().toArray((erro, dados) => {
        res.render('admin-gatos', {'gatos': dados});
    });
});

app.get('/admin/gatos/inserir', (req, res) => {
    res.render('admin-gatos-inserir', {'mensagem': ''});
});

app.post('/admin/gatos/inserir', (req, res) => {
    req.db.collection('gatos').insert(req.body, (erro) => {
        console.log(erro);
        res.render('admin-gatos-inserir', {'mensagem': 'O gato foi inserido com sucesso.'});
    });
});

app.post('/admin/gatos/:id', (req, res) => {
    let id = ObjectID(req.params.id);

    req.db.collection('gatos').remove({_id: id}, (erro) => {
        console.log(erro);
        res.redirect('/admin/gatos');
    });
});

app.get("/sobre", (req, res) =>{
    res.render("sobre");
});


app.listen(3000, () => { // 3000 é porta para acessar o meu computador, que virou um servidor (ip:3000) (se eu for acessar o meu pc, localhost:3000)
    console.log("Servidor Inicializado");
});
