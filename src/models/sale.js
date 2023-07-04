const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: { 
    type: Date, 
    default: Date.now,
    required: true 
  },
  products: [
    new Schema({
      quantidade: Number,
      product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
        required: true
      }
    })
  ]
});

module.exports = mongoose.model('Sale', schema);