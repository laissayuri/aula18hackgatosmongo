// //funçao no formato arrow
// () => {

// }

const express = require('express');
const app = express();
app.set("view engine", "ejs");

app.get("", (req, res) =>{ //request e response
    res.render("index"); // se for colocar com o html direto: res.send(`codigo do html`);
});

app.get("/gatos", (req, res) =>{
    res.render("gatos");
});

app.get("/sobre", (req, res) =>{
    res.render("sobre");
});

app.get("/styles.css", (req, res) => {
    let cores = ["blue", "red", "yellow"];
    let numero = Math.floor(Math.random()*3);

    let cor = cores[numero];
    res.send(`
        body{
            color:${cor};
        }
    `)
});


app.listen(3000, () => { // 3000 é porta para acessar o meu computador, que virou um servidor (ip:3000) (se eu for acessar o meu pc, localhost:3000)
    console.log("Servidor Inicializado");
});
