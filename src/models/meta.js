const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  valor: {
    type: Number,
    required: true
  },
  titulo: {
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
  percentual: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Meta', schema);