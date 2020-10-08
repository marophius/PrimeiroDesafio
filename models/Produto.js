const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Produto = new Schema({
    nomeProduto: {
        type: String,
        required: true,
    },
    preco: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    promocao: {
        type: String,
        required: true,
    },
    quantidade: {
        type: String,
        required: true,
    },
    marca: {
        type: String,
        required: true,
    },
    disponivel: {
        type: String,
        required: true,

    }


});

mongoose.model("Produtos", Produto);