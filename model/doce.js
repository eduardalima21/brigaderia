const mongoose = require('mongoose');

const DoceSchema = new mongoose.Schema({
    nome: String,
  });

module.exports = mongoose.model("Doce", DoceSchema)