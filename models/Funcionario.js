const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Funcionario = new Schema({
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
        required: true
    },
    dataNascimento: {
        type: Date,
        required: true,
        default: Date.now()
    },
    cargo: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    salario: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },

    deficiente: {
        type: String,
        required: true
    },

})

mongoose.model("Funcionarios", Funcionario);