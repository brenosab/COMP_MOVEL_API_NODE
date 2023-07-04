const mongoose = require('mongoose');
const Plano = mongoose.model('Plano');
const repository = require('../repositories/plano-repository');

// get with filters
exports.getByFilters = async (req, res) => {
  try {
    let descricao = req.query.descricao;
    let titulo = req.query.titulo;

    var data = await repository.getByFilter(descricao, titulo);
    res.status(200).send({ planos: data });

  } catch (e) {
    res.status(500).send({ message: 'Falha ao carregar o plano.' });
  }
};

// list
exports.list = async (req, res) => {
  try {
    var data = await repository.getAll(req.params.linhasPorPagina, req.params.pagina);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: 'Falha ao carregar as planos.' });
  }
};

// create
exports.create = async (req, res) => {
  try {
    const plano = new Plano({
      descricao: req.body.descricao,
      titulo: req.body.titulo,
      valor: req.body.valor,
      data: req.body.data,
      percentual: req.body.percentual
    });
    await plano.save();
    res.status(201).send({ message: 'Plano cadastrado com sucesso!' });
  } catch (e) {
    res.status(500).send({ message: 'Falha ao cadastrar o plano.' });
  }
};

// get
exports.get = async (req, res) => {
  try {
    var data = await repository.get(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: 'Falha ao carregar o plano.' });
  }
};

// update
exports.update = async (req, res) => {
  try {
    const doc = await Plano.findByIdAndUpdate(req.params.id,
      {
        descricao: req.body.descricao,
        titulo: req.body.titulo,
        valor: req.body.valor,
        data: req.body.data,
        percentual: req.body.percentual
      }
    );
    res.status(201).send(doc);
  } catch (e) {
    res.status(500).send({ message: 'Falha ao atualizar o plano.' });
  }
};

// delete
exports.delete = async (req, res) => {
  try {
    await Plano.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: 'Plano removido com sucesso!'
    });
  } catch (e) {
    res.status(500).send({ message: 'Falha ao remover o plano.' });
  }
};