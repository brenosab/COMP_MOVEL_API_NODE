const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const schema = new Schema({
  id: {
    type: Number
  },
  nome: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  email: { 
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [ validator.isEmail, 'invalid email' ]
  },
  senha:{ 
    type: String,
    required: true
  },
});

module.exports = mongoose.model('User', schema);