// //funçao no formato arrow
// () => {

// }

//usar nodemon index.js pra o servidor ja atualizar as mudanças sem ter que ficar inicializando toda hora

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const gatos = require("./data/gatos.json");


const app = express();
app.set("view engine", "ejs");
app.use("/assets", express.static("static")); //css e imagens
app.use(bodyParser.urlencoded());

app.get("", (req, res) =>{ //request e response
    res.render("index"); // se for colocar com o html direto: res.send(`codigo do html`);
});

app.post("", (req, res) => {
    let string = `
        Nome: ${req.body.nome}\n Email: ${req.body.email} \n Mensagem: ${req.body.mensagem} \n
    `;

    fs.writeFile("mensagem.txt", string, {flag: "a"}, (err) =>{
        res.render("obrigado");
    });
});

app.get("/gatos", (req, res) =>{
    res.render("gatos", {"gatos":gatos}); //fala que tem que passar json no template
});

app.get("/sobre", (req, res) =>{
    res.render("sobre");
});


app.listen(3000, () => { // 3000 é porta para acessar o meu computador, que virou um servidor (ip:3000) (se eu for acessar o meu pc, localhost:3000)
    console.log("Servidor Inicializado");
});
