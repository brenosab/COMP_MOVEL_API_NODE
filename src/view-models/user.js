
const UserViewModel = ({
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
  },
  senha:{ 
    type: String,
    required: true
  },
});

export default UserViewModel;