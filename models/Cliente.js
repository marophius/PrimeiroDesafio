const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cliente = new Schema({
    nome:{
        type:String,
        required: true,
    },
    sobrenome:{
        type: String,
        required: true,
    },
    dataNascimento:{
        type: Date,
        required: true,
        default: Date.now()
    },
    email:{
        type: String,
        required:true,
    },
    telefone:{
        type: String,    
        required: true,
    },
    endereco:{
        type: String,
        required:true,
    }
    
});

mongoose.model("Clientes",Cliente);