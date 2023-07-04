const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  valor: {
    type: Number,
    required: true
  },
  data: {
    type: Date, 
    default: Date.now,
    required: true
  },
  meta: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Meta',
    required: true
  },
  despesas: [
    new Schema({
      percentual: Number,
      despesa: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Despesa',
        required: true
      }
    })
  ]
});

module.exports = mongoose.model('Plano', schema);