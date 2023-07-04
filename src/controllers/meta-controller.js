const mongoose = require('mongoose');
const Meta = mongoose.model('Meta');
const repository = require('../repositories/meta-repository');

// get with filters
exports.getByFilters = async (req, res) => {
  try {
    let descricao = req.query.descricao;
    let titulo = req.query.titulo;

    var data = await repository.getByFilter(descricao, titulo);
    res.status(200).send({ metas: data });

  } catch (e) {
    res.status(500).send({ message: 'Falha ao carregar a meta.' });
  }
};

// list
exports.list = async (req, res) => {
  try {
    var data = await repository.getAll(req.params.linhasPorPagina, req.params.pagina);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: 'Falha ao carregar as metas.' });
  }
};

// create
exports.create = async (req, res) => {
  try {
    const meta = new Meta({
      descricao: req.body.descricao,
      titulo: req.body.titulo,
      valor: req.body.valor,
      data: req.body.data,
      percentual: req.body.percentual
    });
    await meta.save();
    res.status(201).send({ message: 'Meta cadastrada com sucesso!' });
  } catch (e) {
    res.status(500).send({ message: 'Falha ao cadastrar a meta.' });
  }
};

// get
exports.get = async (req, res) => {
  try {
    var data = await repository.get(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: 'Falha ao carregar a meta.' });
  }
};

// update
exports.update = async (req, res) => {
  try {
    const doc = await Meta.findByIdAndUpdate(req.params.id,
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
    res.status(500).send({ message: 'Falha ao atualizar a meta.' });
  }
};

// delete
exports.delete = async (req, res) => {
  try {
    await Meta.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: 'Meta removida com sucesso!'
    });
  } catch (e) {
    res.status(500).send({ message: 'Falha ao remover a meta.' });
  }
};