const mongoose = require('mongoose');
const Meta = mongoose.model('Meta');

// get
exports.get = async data => {
  return await Meta.findOne({ "_id": data });
};

// get with filters
exports.getByFilter = async (descricao, titulo) => {
  if (descricao) {
    return await Meta.find({ descricao: descricao });
  }
  if (titulo) {
    return await Meta.find({ titulo: titulo });
  }
  return await Meta.find();
};

// getAll
exports.getAll = async (linhasPorPagina, pagina) => {

  const totalCount = (await Meta.find()).length;
  const pageSize = linhasPorPagina;
  const pageIndex = pagina;
  const skip = (pageIndex - 1) * pageSize;
  const pageCount = Number.parseInt((totalCount / pageSize) + ((totalCount % pageSize) != 0 ? 1 : 0));

  const metas = await Meta.find()
    .sort({ nome: 1 })
    .skip(Number.parseInt(skip))
    .limit(Number.parseInt(pageSize));

  return ({
    metas: metas,
    metadata: {
      count: metas.length,
      totalCount: totalCount,
      pageIndex: pageIndex,
      pageCount: pageCount,
      hasNextPage: ((pageIndex == pageCount) || (pageIndex > pageCount)) ? false : true,
      hasPreviousPage: ((pageIndex == 1) || (pageIndex > pageCount)) ? false : true
    }
  });
};