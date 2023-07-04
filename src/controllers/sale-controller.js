const mongoose = require('mongoose');
const Sale = mongoose.model('Sale');
const repository = require('../repositories/product-repository');

// list
exports.listSales = async (req, res) => {
  try {
    
    const totalCount = (await Sale.find()).length;
    const pageSize = req.params.linhasPorPagina;
    const pageIndex = req.params.pagina;
    const skip = (pageIndex - 1) * pageSize;
    const pageCount = Number.parseInt((totalCount / pageSize) + ((totalCount % pageSize) != 0 ? 1 : 0));

    const sales = await Sale.find()
      .sort({ date: 1 })
      .skip(Number.parseInt(skip))
      .limit(Number.parseInt(pageSize))
      .populate(['user']);
    
    var data = [];

    await Promise.all( sales.map( async sale =>{
      var produtos = [];
      await Promise.all(sale.products.map( async product =>{
        var prod = await repository.getProduct(product.product);
        produtos.push({ quantidade: product.quantidade, product: prod });
      }));
      var saleViewModel = { 
        _id: sale._id, 
        user: sale.user, 
        date: sale.date, 
        products: produtos 
      };
      data.push(saleViewModel);
    }));

    res.status(200).send({ sales: data,
      metadata: {
        count: sales.length, 
        totalCount: totalCount,
        pageIndex: pageIndex,
        pageCount: pageCount,
        hasNextPage: ((pageIndex == pageCount) || (pageIndex > pageCount)) ? false : true,
        hasPreviousPage: ((pageIndex == 1) || (pageIndex > pageCount)) ? false : true
      }
    }
      );
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as vendas.'});
  }
};

// create
exports.createSale = async (req, res) => {
  try {
    const sale = new Sale({
      user: req.body.user,
      products: req.body.products,
      date: req.body.date
    });

    await sale.save();

    res.status(201).send({message: 'Venda cadastrada com sucesso!'});
  } catch (e) {
    res.status(500).send({message: 'Falha ao cadastrar a venda.'});
  }
};

// get with filters
exports.getSales = async (req, res) => {
  try {
    
    const objectId = mongoose.Types.ObjectId(req.query.user);
    const sales = await Sale.find({ user: objectId })      
    .sort({ date: 1 })
    .populate(['user']);

    var data = [];

    await Promise.all( sales.map( async sale =>{
      var produtos = [];
      await Promise.all(sale.products.map( async product =>{
        var prod = await repository.getProduct(product.product);
        produtos.push({ quantidade: product.quantidade, product: prod });
      }));
      var saleViewModel = { 
        _id: sale._id, 
        user: sale.user, 
        date: sale.date, 
        products: produtos 
      };
      data.push(saleViewModel);
    }));
    
    res.status(200).send({ sales: data });    
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as vendas.'});
  }
};

// get
exports.getSale = async (req, res) => {
  try {
    const data = await Sale.findOne({ "_id": req.params.id });
    res.status(200).send(data);    
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar a venda.'});
  }
};

// update
exports.updateSale = async (req, res) => {
  try {

    const filter = { id: req.params.id };
    const doc = await Sale.findOneAndUpdate(filter, req.body, { new: true, upsert: true });
    res.status(201).send(doc);
  } catch (e) {
    res.status(500).send({message: 'Falha ao cadastrar a venda.'});
  }
};

// delete
exports.deleteSale = async (req, res) => {
  try {

    await Sale.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: 'Venda removida com sucesso!'
    });
  } catch (e) {
    res.status(500).send({message: 'Falha ao remover a venda.'});
  }
};