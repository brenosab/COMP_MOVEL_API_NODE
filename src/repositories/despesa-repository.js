const mongoose = require('mongoose');
const Despesa = mongoose.model('Despesa');

// get
exports.get = async data => {
  return await Despesa.findOne({ "_id": data });
};

// get with filters
exports.getByFilter = async (descricao, categoria) => {
  if (descricao) {
    return await Despesa.find({ descricao: descricao });
  }
  if (categoria) {
    return await Despesa.find({ categoria: categoria });
  }
  return await Despesa.find();
};

// getAll ProductImages
// exports.getAllProductImages = async () => {
//   return await Product.find().select('productImage').where('productImage').ne(null);
// }

// getAll
exports.getAll = async (linhasPorPagina, pagina) => {

  const totalCount = (await Despesa.find()).length;
  const pageSize = linhasPorPagina;
  const pageIndex = pagina;
  const skip = (pageIndex - 1) * pageSize;
  const pageCount = Number.parseInt((totalCount / pageSize) + ((totalCount % pageSize) != 0 ? 1 : 0));

  const despesas = await Despesa.find()
    .sort({ nome: 1 })
    .skip(Number.parseInt(skip))
    .limit(Number.parseInt(pageSize));

  return ({
    despesas: despesas,
    metadata: {
      count: despesas.length,
      totalCount: totalCount,
      pageIndex: pageIndex,
      pageCount: pageCount,
      hasNextPage: ((pageIndex == pageCount) || (pageIndex > pageCount)) ? false : true,
      hasPreviousPage: ((pageIndex == 1) || (pageIndex > pageCount)) ? false : true
    }
  });
};