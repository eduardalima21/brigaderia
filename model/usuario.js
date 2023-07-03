/*var conexao = require ('../config/conexao.js')

var UsuarioSchema = conexao.Schema ({
    nome:{type:String},
    email:{type:String},
    senha:{type:String},
    foto:{type:String},
})*/
const mongoose = require('mongoose');

const UsuarioSchema2 = new mongoose.Schema({
    nome: String,
    email: String,
    idade: Number
  });

module.exports = mongoose.model ("Usuario", UsuarioSchema2)

