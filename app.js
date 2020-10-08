// Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
require('./models/Funcionario');
require('./models/Cliente');
require('./models/Produto');
const Cliente = mongoose.model("Clientes");
const Funcionario = mongoose.model("Funcionarios");
const Produto = mongoose.model("Produtos");
var db = mongoose.connection;
mongoose.set('useFindAndModify', false);


// Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));

// Mongoose
const uri = "mongodb+srv://teste:teste123@cluster0.fyieh.mongodb.net/teste?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(uri || "mongodb://localhost/DesafioI", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Conectado ao Mongo");
}).catch((err) => {
    console.log("Erro ao se conectar: " + err);
})

mongoose.connection.on('connected', () => {
    console.log('moongose conectado!');
});

//Others
const porta = 3000;
app.listen(porta, (req, res) => {
    console.log();
})

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
    Funcionario.deleteOne({ _id: req.body.id }).then(() => {
        console.log("Funcionario deletada com sucesso!")
        res.redirect('/funcionarios');
    }).catch((err) => {
        console.log("Erro ao salvar a categoria: " + err);
        res.redirect('/funcionarios');
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
        res.redirect('/funcionarios');
    }).catch((err) => {
        console.log("Erro ao salvar a categoria: " + err);
        res.redirect('/cadastrarFuncionario');
    });


});

app.get('/editarFuncionario/:id', (req, res) => {
    Funcionario.findOne({ _id: req.params.id })
        .then((funcionarios) => {
            res.render('editarFuncionario', { funcionarios: funcionarios });
        }).catch((error) => {
            console.log("Erro ao achar funcionario: " + error);
            res.redirect('/');
        })
})

app.post('/editarFuncionario/:id', (req, res) => {
    Funcionario.findByIdAndUpdate({ _id: req.params.id },

            {
                $set: {
                    nome: req.body.nome,
                    sobrenome: req.body.sobrenome,
                    dataNascimento: req.body.dataNascimento,
                    cargo: req.body.cargo
                }
            },
            console.log("Alterado com sucesso!"),
            res.redirect('/funcionarios')
        )
        .catch((error) => {
            console.log("Erro ao salvar a funcionario: " + error);

            res.redirect('/');
        })
});


// CLIENTES
app.get('/cadastrarCliente', (req, res) => {
    res.render('cadastrarCliente');
});

app.post('/cadastrarCliente', (req, res) => {
    const novoCliente = {
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        dataNascimento: req.body.dataNascimento,
        email: req.body.email,
        telefone: req.body.telefone,
        endereco: req.body.endereco,
    }

    new Cliente(novoCliente).save().then(() => {
        console.log("Categoria salva com sucesso!");
        res.redirect('/cliente');
    }).catch((err) => {
        console.log("Erro ao salvar a categoria: " + err);
        res.redirect('/cadastrarCliente');
    });

});

app.get('/cliente', (req, res) => {
    Cliente.find().then((cliente) => {
        res.render('cliente', {
            cliente: cliente
        });
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao exibir os clientes");
        res.redirect('/cadastrarCliente');
    })

});

app.post('/deletarCliente', (req, res) => {
    Cliente.deleteOne({ _id: req.body.id }).then(() => {
        console.log("Cliente deletado com sucesso!")
        res.redirect('/cliente');
    }).catch((err) => {
        console.log("Erro ao salvar cliente: " + err);
        res.redirect('/cliente');
    })
})

app.get('/editarCliente/:id', (req, res) => {
    Cliente.findOne({ _id: req.params.id })
        .then((cliente) => {
            res.render('editarCliente', { cliente: cliente });
        }).catch((error) => {
            console.log("Erro ao achar Cliente: " + error);
            res.redirect('/');
        })
})

app.post('/editarCliente/:id', (req, res) => {
    Cliente.findByIdAndUpdate({ _id: req.params.id },

            {
                $set: {
                    nome: req.body.nome,
                    sobrenome: req.body.sobrenome,
                    telefone: req.body.telefone,
                    email: req.body.email,
                    endereco: req.body.endereco,
                    dataNascimento: req.body.dataNascimento,

                }
            },
            console.log("Alterado com sucesso!"),
            res.redirect('/cliente')
        )
        .catch((error) => {
            console.log("Erro ao salvar a cliente: " + error);

            res.redirect('/');
        })
});

//Produto
app.get('/cadastrarProduto', (req, res) => {
    res.render('cadastrarProduto');
});
app.post('/cadastrarProduto', (req, res) => {
    const novoProduto = {
        nomeProduto: req.body.nomeProduto,
        preco: req.body.preco,
        quantidade: req.body.quantidade,
        marca: req.body.marca,
        promocao: req.body.promocao,
        disponivel: req.body.disponivel,
        categoria: req.body.categoria,
        descricao: req.body.descricao,
    }

    new Produto(novoProduto).save().then(() => {
        console.log("Categoria salva com sucesso!")
        res.redirect('/produtos');
    }).catch((err) => {
        console.log("Erro ao salvar a categoria: " + err);
        res.redirect('/');
    });
});

app.get('/produtos', (req, res) => {
    Produto.find().then((produtos) => {
        res.render('produtos', {
            produtos: produtos
        });
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao exibir os produtos");
        res.redirect('/cadastrarProduto');
    })

});

app.post('/deletarProduto', (req, res) => {
    Produto.deleteOne({ _id: req.body.id }).then(() => {
        console.log("Produto deletada com sucesso!")
        res.redirect('/produtos');
    }).catch((err) => {
        console.log("Erro ao salvar produto: " + err);
        res.redirect('/produtos');
    })
})

app.get('/editarProduto/:id', (req, res) => {
    Produto.findOne({ _id: req.params.id })
        .then((produto) => {
            res.render('editarProduto', { produto: produto });
        }).catch((error) => {
            console.log("Erro ao achar produto: " + error);
            res.redirect('/');
        })
})

app.post('/editarProduto/:id', (req, res) => {
    Produto.findByIdAndUpdate({ _id: req.params.id },

            {
                $set: {
                    nomeProduto: req.body.nomeProduto,
                    preco: req.body.preco,
                    quantidade: req.body.quantidade,
                    marca: req.body.marca,
                    promocao: req.body.promocao,
                    disponivel: req.body.disponivel,
                    categoria: req.body.categoria,
                    descricao: req.body.descricao,


                }
            },
            console.log("Alterado com sucesso!"),
            res.redirect('/produtos')
        )
        .catch((error) => {
            console.log("Erro ao salvar a produto: " + error);

            res.redirect('/');
        })
});