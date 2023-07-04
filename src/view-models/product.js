const ProductViewModel = ({
  id: {
    type: Number,
  },
  nome: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  estoque: {
    type: Number,
    required: true
  },
  valor: {
    type: Number,
    required: true
  },
});

export default ProductViewModel;