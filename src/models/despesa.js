const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  valor: {
    type: Number,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  data: {
    type: Date, 
    default: Date.now,
    required: true
  },
  anexo: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Despesa', schema);