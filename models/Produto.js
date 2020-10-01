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
    }

});

mongoose.model("Produtos", Produto);