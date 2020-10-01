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
    }

})

mongoose.model("Funcionarios", Funcionario);