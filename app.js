// Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
require('./models/Funcionario');
require('./models/Cliente');
const Cliente  = mongoose.model("Clientes");
const Funcionario = mongoose.model("Funcionarios");


// Config
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname, "public")));
// Routes
app.get('/', (req, res) => {
    Funcionario.find().then((funcionarios) => {
        res.render('index', {
            funcionarios: funcionarios
        });
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar os funcionarios");
        res.redirect('/cadastrarFuncionario');
    })
    
});

app.post('/deletarFuncionario', (req, res) => {
    Funcionario.remove({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Categoria deletada com sucesso");
        res.redirect('/home');
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao deletar a categoria");
        res.redirect('/home');
    })
})

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

// CLIENTES
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
    console.log();
})