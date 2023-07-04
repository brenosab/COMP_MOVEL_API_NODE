const mongoose = require('mongoose');
const Plano = mongoose.model('Plano');

// get
exports.get = async data => {
  return await Plano.findOne({ "_id": data });
};

// get with filters
exports.getByFilter = async (descricao, categoria) => {
  if (descricao) {
    return await Plano.find({ descricao: descricao });
  }
  if (categoria) {
    return await Plano.find({ categoria: categoria });
  }
  return await Plano.find();
};

// getAll
exports.getAll = async (linhasPorPagina, pagina) => {

  const totalCount = (await Plano.find()).length;
  const pageSize = linhasPorPagina;
  const pageIndex = pagina;
  const skip = (pageIndex - 1) * pageSize;
  const pageCount = Number.parseInt((totalCount / pageSize) + ((totalCount % pageSize) != 0 ? 1 : 0));

  const planos = await Plano.find()
    .sort({ nome: 1 })
    .skip(Number.parseInt(skip))
    .limit(Number.parseInt(pageSize));

  return ({
    planos: planos,
    metadata: {
      count: planos.length,
      totalCount: totalCount,
      pageIndex: pageIndex,
      pageCount: pageCount,
      hasNextPage: ((pageIndex == pageCount) || (pageIndex > pageCount)) ? false : true,
      hasPreviousPage: ((pageIndex == 1) || (pageIndex > pageCount)) ? false : true
    }
  });
};