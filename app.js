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
var db = mongoose.connection;


// Config
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname, "public")));

// Routes

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/funcionarios', (req, res) => {
    Funcionario.find().then((funcionarios) => {
        res.render('funcionarios', {
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
        res.redirect('/');
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao deletar a categoria");
        res.redirect('/');
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

app.get('/editarFuncionario/:id', (req, res) => {
    Funcionario.findOne({_id: req.params.id})
    .then((funcionario) => {
        res.render('editarFuncionario', {funcionario: funcionario});
    }).catch((error) => {
        req.flash('error_msg', "Esse funcionario não existe");
        res.redirect('/');
    })
})

app.post('/editarFuncionario', (req, res) => {
    Funcionario.findOne({_id: req.body.id})
    .then((funcionario) => {
        funcionario.nome = req.body.nome;
        funcionario.sobrenome = req.body.sobrenome;
        funcionario.dataNascimento = req.body.dataNascimento;
        funcionario.cargo = req.body.cargo;

        funcionario.save().then(() => {
            req.flash("success_msg", "Funcionario salvo!");
            res.redirect('/');
        }).catch((error) => {
            req.flash("error_msg", "Houve um erro interno ao salvar a edição do funcionario");
            res.redirect('/');
        });
    }).catch((error) => {
        req.flash("error_msg", "Houve um erro ao editar o funcionário");
        res.redirect('/');
    })
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