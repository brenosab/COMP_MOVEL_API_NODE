const mongoose = require('mongoose');
const Despesa = mongoose.model('Despesa');
const repository = require('../repositories/despesa-repository');

// get with filters
exports.getByFilters = async (req, res) => {
  try {
    let descricao = req.query.descricao;
    let categoria = req.query.categoria;

    var data = await repository.getByFilter(descricao, categoria);
    res.status(200).send({ despesas: data }); 

  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar a despesa.'});
  }
};

// list
exports.list = async (req, res) => {
  try {
    var data = await repository.getAll(req.params.linhasPorPagina, req.params.pagina);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as despesas.'});
  }
};

// // list images
// exports.listDespesaImages = async (req, res) => {
//   try {
//     var data = await repository.getAllDespesaImages();
//     res.status(200).send(data);
//   } catch (e) {
//     res.status(500).send({message: 'Falha ao carregar as imagens.'});
//   }
// };

// create
exports.create = async (req, res) => {
  try {
    const despesa = new Despesa({
      descricao: req.body.descricao,
      categoria: req.body.categoria,
      valor: req.body.valor,
      data: req.body.data,
      anexo: '123'
      //,
      //anexo: req.file.path
    });
    console.log(despesa);
    await despesa.save();
    res.status(201).send({message: 'Despesa cadastrada com sucesso!'});
  } catch (e) {
    res.status(500).send({message: 'Falha ao cadastrar a despesa.'});
  }
};

// get
exports.get = async (req, res) => {
  try {
    var data = await repository.get(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar a despesa.'});
  }
};

// update
exports.update = async (req, res) => {
  try {
    const doc = await Despesa.findByIdAndUpdate(req.params.id,
      {
        descricao: req.body.descricao,
        categoria: req.body.categoria,
        valor: req.body.valor,
        data: req.body.data,
        anexo: req.file.path
      }
    );
    res.status(201).send(doc);
  } catch (e) {
    res.status(500).send({message: 'Falha ao atualizar a despesa.'});
  }
};

// delete
exports.delete = async (req, res) => {
  try {
    await Despesa.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: 'Despesa removido com sucesso!'
    });
  } catch (e) {
    res.status(500).send({message: 'Falha ao remover a despesa.'});
  }
};