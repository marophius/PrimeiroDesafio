// Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
//const routes = require('./routes/routes');
const path = require('path');
require('./models/Funcionario');
const Funcionario = mongoose.model("Funcionarios")

require('./models/Cliente');
const Cliente  = mongoose.model("Clientes");

// Config
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname, "public")));
    
// Routes
app.get('/', (req, res) => {
    Funcionario.find();
    res.render('index');
});

app.get('/cadastrarFuncionario', (req, res) => {
    res.render('cadastrarFuncionario');
});

app.post('/cadastrarFuncionario', (req, res) => {
    const novoFuncionario = {
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        dataNascimento: req.body.dataNascimento,
        cargo: req.body.cargo
    }
    
    new Funcionario(novoFuncionario).save().then(() => {
        console.log("Categoria salva com sucesso!")
    }).catch((err) => {
        console.log("Erro ao salvar a categoria: "+err);
    });

    res.redirect('/');
});
app.get('/cadastrarCliente', (req,res) => {
    res.render('cadastrarCliente');
});
app.post('/cadastrarCliente', (req, res )=> {
    const novoCliente = {
        nome: req.body.nome,   
        sobrenome:req.body.sobrenome,
        dataNascimento:req.body.dataNascimento,
        email: req.body.email,
        telefone: req.body.telefone,
        endereco: req.body.endereco,
    }

    new Cliente (novoCliente).save().then(() => {
        console.log("Categoria salva com sucesso!")
    }).catch((err) => {
        console.log("Erro ao salvar a categoria: "+ err);
    });
    res.redirect('/');
});



 // Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/DesafioI").then(() =>{
        console.log("Conectado ao Mongo");
    }).catch((err) => {
        console.log("Erro ao se conectar: "+err);
    })

//Others
const porta = 3000;
app.listen(porta, (req, res) =>{
    console.log("Url: localhost:3000");
});